import { useState, useRef } from "react";
import {
  Camera,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  Link,
  Brain,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import dotenv from "dotenv";
dotenv.config();


const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

interface OfferAnalyzerProps {
  onBack: () => void;
}

interface MarketingTrick {
  name: string;
  description: string;
}

interface AnalysisResult {
  verdict: "good" | "bad" | "caution";
  title: string;
  summary: string;
  keyPoints: string[];
  hiddenCosts: string[];
  recommendation: string;
  alternatives: string[];
  marketingTricks: MarketingTrick[];
}

export function OfferAnalyzer({ onBack }: OfferAnalyzerProps) {
  const [capturedImage, setCapturedImage] = useState<
    string | null
  >(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [cameraError, setCameraError] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isUrlAnalysis, setIsUrlAnalysis] = useState(false);

  const startCamera = async () => {
    setCameraError(null); // Clear any previous errors
    setVideoLoaded(false);

    try {
      // Check if mediaDevices is available
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setCameraError(
          "Camera API is not supported in this browser. Please use the upload or URL options instead.",
        );
        setIsCameraActive(false);
        return;
      }

      // First, check permission status if available
      if (
        navigator.permissions &&
        navigator.permissions.query
      ) {
        try {
          const permissionStatus =
            await navigator.permissions.query({
              name: "camera" as PermissionName,
            });
          console.log(
            "Camera permission status:",
            permissionStatus.state,
          );

          if (permissionStatus.state === "denied") {
            setCameraError(
              "Camera access is blocked. Please click the camera icon in your browser's address bar and allow camera access, then refresh the page.",
            );
            setIsCameraActive(false);
            return;
          }
        } catch (permError) {
          console.log(
            "Permission API not fully supported, proceeding anyway:",
            permError,
          );
        }
      }

      setIsCameraActive(true); // Set state to show video element

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Set up event handlers
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded");
          setVideoLoaded(true);
        };

        videoRef.current.onloadeddata = () => {
          console.log("Video data loaded");
        };

        // Try to play immediately
        try {
          await videoRef.current.play();
          console.log("Video playing successfully");
        } catch (playError) {
          console.log(
            "Initial play failed, waiting for user interaction or metadata:",
            playError,
          );
        }
      }
    } catch (error: any) {
      // Camera access denied - show user-friendly message
      console.error("Camera error:", error);
      let errorMessage =
        "Unable to access camera. Please grant camera permissions in your browser settings or use the upload/URL options instead.";

      if (error.name === "NotAllowedError") {
        errorMessage =
          "Camera permission was denied. To fix this:\n\n1️⃣ Look for the camera icon (🎥) in your browser's address bar\n2️⃣ Click it and select 'Allow'\n3️⃣ Refresh this page\n\nOR use the 'Upload Image' option below instead!";
      } else if (error.name === "NotFoundError") {
        errorMessage =
          "No camera found on this device. Please use the upload image or URL options instead.";
      } else if (error.name === "NotReadableError") {
        errorMessage =
          "Camera is already in use by another application. Please close other apps using the camera and try again.";
      } else if (error.name === "OverconstrainedError") {
        errorMessage =
          "Camera constraints could not be satisfied. Trying with default settings...";

        // Try again without constraints
        try {
          const simpleStream =
            await navigator.mediaDevices.getUserMedia({
              video: true,
            });
          if (videoRef.current) {
            videoRef.current.srcObject = simpleStream;
            await videoRef.current.play();
            return; // Success with simple constraints
          }
        } catch (retryError) {
          errorMessage =
            "Unable to access camera with any settings. Please try the upload option instead.";
        }
      }

      setCameraError(errorMessage);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageData);
      stopCamera();
      analyzeImage(imageData);
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setCapturedImage(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔁 UPDATED: use real Gemini analysis instead of mock timeout
  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    // Generate screenshot URL using a screenshot service
    const screenshotUrl = `https://image.thum.io/get/width/1200/crop/900/noanimate/${encodeURIComponent(urlInput)}`;
    setCapturedImage(screenshotUrl); // Use screenshot as the preview
    await analyzeUrl(urlInput, screenshotUrl);
  };

  // 🔁 UPDATED: call Gemini with a text-only prompt
  const analyzeUrl = async (
    url: string,
    screenshotUrl?: string,
  ) => {
    setIsAnalyzing(true);
    try {
      const prompt = `
        You are an AI financial advisor analyzing offers for Finnish consumers.
        The user is giving you a URL${screenshotUrl ? " and a screenshot of the page" : ", but you cannot actually browse it"}.

        URL: ${url}

        Context: You're helping young Finnish people understand financial offers and compare them to alternatives.
        Use your knowledge of Finnish financial services (banks like Nordea, OP, S-Pankki, Danske Bank, etc.),
        Finnish consumer protection laws, and price comparison services like Hintaopas.fi, Kilpailuta.fi, and Vertaa.fi. 

        Based on ${screenshotUrl ? "the screenshot and " : ""}common patterns of risky financial offers, infer potential risks, hidden costs,
        and whether this sounds like a good, bad, or caution-type offer.

        In the "alternatives" field, provide 3-4 SPECIFIC suggestions such as:
        - Competitor offers from Finnish banks or services
        - Recommendations to check Hintaopas.fi, Kilpailuta.fi, or Vertaa.fi
        - Better deals available in Finland
        - Consumer protection resources like Finanssivalvonta or Suomi.fi

        Return ONLY valid JSON in this exact structure:

        {
          "verdict": "good | bad | caution",
          "title": "short title for the verdict",
          "summary": "2–3 sentences explaining why",
          "keyPoints": [
            "bullet point 1",
            "bullet point 2",
            "bullet point 3",
            "bullet point 4"
          ],
          "hiddenCosts": [
            "hidden cost 1",
            "hidden cost 2",
            "hidden cost 3",
            "hidden cost 4"
          ],
          "recommendation": "Clear recommendation in ALL CAPS at the beginning (e.g. REJECT / PROCEED WITH CAUTION / ACCEPT)",
          "alternatives": [
            "Check Hintaopas.fi or Kilpailuta.fi to compare [specific product type] offers",
            "Consider [specific Finnish bank/service] which typically offers [specific better terms]",
            "Visit Finanssivalvonta.fi to verify this provider is licensed",
            "Compare with offers from [specific competitors]"
          ],
          "marketingTricks": [
            {
              "name": "Trick Name 1",
              "description": "Description of the trick 1"
            },
            {
              "name": "Trick Name 2",
              "description": "Description of the trick 2"
            }
          ]
        }

        Do not include any markdown, code fences, or extra text. Only pure JSON.
      `;

      const body = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
        },
      };

      const res = await fetch(
        `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        console.error("Gemini URL error:", await res.text());
        throw new Error("Gemini API error");
      }

      const data = await res.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No text returned from Gemini");
      }

      const parsed = JSON.parse(text) as AnalysisResult;
      setAnalysisResult(parsed);
      setIsUrlAnalysis(true);
    } catch (error) {
      console.error("Error analyzing URL with Gemini:", error);
      alert("Error analyzing the URL. Please try again.");
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // UPD: call Gemini vision with inline_data (base64 image)
  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      const base64 = imageData.split(",")[1]; // strip "data:image/jpeg;base64,"

      const prompt = `
        You are a financial offer risk analyzer for Finnish consumers.

        The user is providing an image of a financial offer (loan, credit card, financing plan,
        subscription ad, etc.). Read any visible amounts, APR percentages, fees, and fine print as best as you can.

        Context: You're helping young Finnish people understand financial offers and compare them to alternatives.
        Consider Finnish financial services (banks like Nordea, OP, S-Pankki, Danske Bank, etc.),
        Finnish consumer protection laws, and comparison services.

        In the "alternatives" field, provide 3-4 SPECIFIC actionable suggestions such as:
        - "Compare loan offers on Hintaopas.fi or Kilpailuta.fi to find better rates"
        - "Check if Nordea, OP, or S-Pankki offers better terms for this type of [product]"
        - "Visit Finanssivalvonta.fi to verify this provider is properly licensed"
        - "Use Vertaa.fi to compare [specific product type] from multiple Finnish providers"
        - Specific competitor alternatives with better typical rates/terms

        Based on what you see, return ONLY valid JSON with this exact structure:

        {
          "verdict": "good | bad | caution",
          "title": "short title for the verdict",
          "summary": "2–3 sentences explaining why",
          "keyPoints": [
            "bullet point 1",
            "bullet point 2",
            "bullet point 3",
            "bullet point 4"
          ],
          "hiddenCosts": [
            "hidden cost 1 (if none, explain why you think there are no obvious hidden costs)",
            "hidden cost 2",
            "hidden cost 3",
            "hidden cost 4"
          ],
          "recommendation": "Clear recommendation in ALL CAPS at the beginning (e.g. REJECT / PROCEED WITH CAUTION / ACCEPT)",
          "alternatives": [
            "Compare this offer on Hintaopas.fi or Kilpailuta.fi",
            "Check [specific Finnish competitor] which typically offers [better specific terms]",
            "Visit Finanssivalvonta.fi to verify provider licensing",
            "Consider [specific alternative action or provider]"
          ],
          "marketingTricks": [
            {
              "name": "Trick Name 1",
              "description": "Description of the trick 1"
            },
            {
              "name": "Trick Name 2",
              "description": "Description of the trick 2"
            }
          ]
        }

        Do not include any markdown, code fences, or extra commentary. Only pure JSON.
      `;

      const body = {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
        },
      };

      const res = await fetch(
        `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        console.error("Gemini image error:", await res.text());
        throw new Error("Gemini API error");
      }

      const data = await res.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No text returned from Gemini");
      }

      const parsed = JSON.parse(text) as AnalysisResult;
      setAnalysisResult(parsed);
      setIsUrlAnalysis(false);
    } catch (error) {
      console.error(
        "Error analyzing image with Gemini:",
        error,
      );
      alert("Error analyzing the image. Please try again.");
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalyzer = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    stopCamera();
  };

  const verdictConfig = {
    good: {
      icon: CheckCircle2,
      color: "text-green-400",
      bgGradient: "from-green-400 to-emerald-500",
      borderColor: "border-green-500",
    },
    bad: {
      icon: XCircle,
      color: "text-red-400",
      bgGradient: "from-red-400 to-pink-500",
      borderColor: "border-red-500",
    },
    caution: {
      icon: AlertTriangle,
      color: "text-yellow-400",
      bgGradient: "from-yellow-400 to-orange-500",
      borderColor: "border-yellow-500",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
      <div className="max-w-2xl mx-auto py-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/20 border-2 border-white/40"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-white text-2xl md:text-3xl font-black">
            AI offer analyzer
          </h1>
        </div>

        {/* Main Content */}
        {!capturedImage && !isCameraActive && (
          <div className="space-y-4">
            {/* Camera Error Alert */}
            {cameraError && (
              <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-500/50 rounded-2xl p-4">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-300 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-black text-base mb-2">
                      Camera access denied
                    </h3>
                    <div className="text-white/90 text-sm leading-relaxed whitespace-pre-line">
                      {cameraError}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gradient-to-br from-blue-400 to-cyan-500 border-b-4 border-blue-700 py-3 text-base font-black"
                  >
                    🔄 Refresh page
                  </Button>
                  <Button
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="w-full bg-gradient-to-br from-purple-400 to-pink-500 border-b-4 border-purple-700 py-3 text-base font-black"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload image instead
                  </Button>
                </div>
              </div>
            )}

            {/* Camera Button */}
            <button
              onClick={startCamera}
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border-4 border-white/30 hover:border-white/50 rounded-3xl p-8 transition-all hover:scale-105 active:scale-95"
            >
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 mb-4 inline-flex border-4 border-white/40">
                <Camera className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-white text-2xl font-black mb-2 uppercase">
                Take photo
              </h2>
              <p className="text-white/80 text-base">
                Capture any offer
              </p>
            </button>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border-4 border-white/30 hover:border-white/50 rounded-3xl p-8 transition-all hover:scale-105 active:scale-95"
            >
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-6 mb-4 inline-flex border-4 border-white/40">
                <Upload className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-white text-2xl font-black mb-2 uppercase">
                Upload Image
              </h2>
              <p className="text-white/80 text-base">
                Choose an image from your device
              </p>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* URL Input */}
            <div className="w-full bg-white/10 backdrop-blur-sm border-4 border-white/30 hover:border-white/50 rounded-3xl p-8 transition-all">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 mb-4 inline-flex border-4 border-white/40">
                <Link className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-white text-2xl font-black mb-3 uppercase">
                Paste Link
              </h2>
              <p className="text-white/80 text-base mb-4">
                Enter any offer URL
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleUrlSubmit()
                  }
                  placeholder="https://example.com/offer"
                  className="flex-1 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white placeholder:text-white/50 rounded-xl px-4 py-3 font-bold focus:border-white/60 focus:ring-2 focus:ring-white/40"
                />
                <Button
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                  className="bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 border-b-4 border-green-700 px-6 py-3 font-black uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Link className="w-5 h-5 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6">
              <h3 className="text-white font-black text-lg mb-3 uppercase">
                How it works:
              </h3>
              <ol className="text-white/80 space-y-2 text-sm md:text-base">
                <li className="flex gap-2">
                  <span className="font-black text-yellow-300">
                    1.
                  </span>
                  <span>Capture or paste any offer</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black text-yellow-300">
                    2.
                  </span>
                  <span>AI analyzes terms & fine print</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black text-yellow-300">
                    3.
                  </span>
                  <span>Get instant verdict</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Camera View */}
        {isCameraActive && (
          <div className="space-y-4">
            <div
              className="relative bg-black rounded-3xl overflow-hidden border-4 border-white/30 min-h-[400px] md:min-h-[500px] flex items-center justify-center cursor-pointer"
              onClick={capturePhoto}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!videoRef.current?.srcObject && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              )}

              {/* Floating Capture Button */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
                <div className="bg-white/20 backdrop-blur-md border-4 border-white/60 rounded-full p-4 shadow-2xl animate-pulse">
                  <Camera className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <p className="text-white text-sm font-black uppercase drop-shadow-lg bg-black/40 px-4 py-2 rounded-full">
                  Tap to cap
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={stopCamera}
                variant="outline"
                className="flex-1 bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 py-6 text-lg font-black"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Analysis Loading */}
        {capturedImage && isAnalyzing && (
          <div className="bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6 border-4 border-white/40">
              <Loader2 className="w-12 h-12 text-cyan-300 animate-spin" />
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-black mb-3 uppercase">
              Analyzing Offer...
            </h2>
            <p className="text-white/80 text-base md:text-lg">
              Our AI is reading the fine print for you
            </p>
          </div>
        )}

        {/* Analysis Result */}
        {capturedImage && analysisResult && !isAnalyzing && (
          <div className="space-y-4">
            {/* Preview Image */}
            <div className="bg-black rounded-2xl overflow-hidden border-4 border-white/30">
              {isUrlAnalysis ? (
                <div className="bg-white/10 backdrop-blur-sm  border-white/30 rounded-2xl p-4">
                  <p className="text-white/60 text-xs font-bold mb-2 uppercase">
                    Analyzed URL:
                  </p>
                  <a
                    href={urlInput}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm md:text-base font-bold hover:text-cyan-300 transition-colors break-all flex items-center gap-2"
                  >
                    <Link className="w-4 h-4 flex-shrink-0" />
                    {urlInput}
                  </a>
                </div>
              ) : (
                <img
                  src={capturedImage}
                  alt="Captured offer"
                  className="w-full"
                />
              )}
            </div>

            {/* Verdict */}
            <div
              className={`bg-gradient-to-br ${verdictConfig[analysisResult.verdict].bgGradient} rounded-3xl p-1 border-4 border-white/30 shadow-2xl`}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  {(() => {
                    const Icon =
                      verdictConfig[analysisResult.verdict]
                        .icon;
                    return (
                      <Icon
                        className={`w-12 h-12 ${verdictConfig[analysisResult.verdict].color}`}
                      />
                    );
                  })()}
                  <h2 className="text-white text-2xl md:text-3xl font-black uppercase">
                    {analysisResult.title}
                  </h2>
                </div>
                <p className="text-white/90 text-base md:text-lg leading-relaxed">
                  {analysisResult.summary}
                </p>
              </div>
            </div>
            {/* Marketing Tricks */}
            {analysisResult.marketingTricks.length > 0 && (
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-6 border-2 border-orange-400">
                <h3 className="text-orange-900 font-black text-lg md:text-xl mb-4 uppercase flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Marketing tricks used:
                </h3>
                <div className="space-y-3">
                  {analysisResult.marketingTricks.map(
                    (trick, index) => (
                      <div
                        key={index}
                        className="bg-white/60 rounded-lg p-3 border border-orange-300"
                      >
                        <h4 className="text-orange-900 text-sm md:text-base font-black mb-1">
                          {trick.name}
                        </h4>
                        <p className="text-gray-700 text-xs md:text-sm leading-tight font-semibold">
                          {trick.description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
            {/* Key Points */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6">
              <h3 className="text-white font-black text-lg md:text-xl mb-4 uppercase">
                Key points:
              </h3>
              <ul className="space-y-2">
                {analysisResult.keyPoints.map(
                  (point, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-white/90 text-sm md:text-base"
                    >
                      <span className="text-yellow-300 font-black">
                        •
                      </span>
                      <span>{point}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Hidden Costs */}
            {analysisResult.hiddenCosts.length > 0 && (
              <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-500/50 rounded-2xl p-6">
                <h3 className="text-white font-black text-lg md:text-xl mb-4 uppercase flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Hidden costs:
                </h3>
                <ul className="space-y-2">
                  {analysisResult.hiddenCosts.map(
                    (cost, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-white/90 text-sm md:text-base"
                      >
                        <span className="text-red-300 font-black">
                          ⚠
                        </span>
                        <span>{cost}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Recommendation */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6">
              <h3 className="text-white font-black text-lg md:text-xl mb-3 uppercase">
                Recommendation:
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                {analysisResult.recommendation}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setCapturedImage(null);
                  setAnalysisResult(null);
                  startCamera();
                }}
                variant="outline"
                className="flex-1 bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 py-6 text-lg font-black"
              >
                <Camera className="w-5 h-5 mr-2" />
                Retake photo
              </Button>
              <Button
                onClick={resetAnalyzer}
                className="flex-1 bg-gradient-to-br from-cyan-400 to-blue-500 border-b-4 border-blue-700 py-6 text-lg font-black"
              >
                Analyze another
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}