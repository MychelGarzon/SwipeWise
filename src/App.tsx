import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
  useAnimate,
} from "motion/react";
import { ads } from "./data/ads";
import { Ad } from "./types/ad";
import { UserProfile } from "./types/profile";
import { generatePersonalizedAds } from "./utils/adGenerator";
import { generatePersonalizedAdsWithAI } from "./utils/aiAdGenerator";
import { AdCard } from "./components/AdCard";
import { ResultBreakdown } from "./components/ResultBreakdown";
import { FinalResults } from "./components/FinalResults";
import { HomePage } from "./components/HomePage";
import { OfferAnalyzer } from "./components/OfferAnalyzer";
import { GeneratingAds } from "./components/GeneratingAds";
import { ProfileSetupScreen } from "./components/ProfileSetupScreen";
import { Progress } from "./components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./components/ui/button";

const imageMap: Record<string, string> = {
  "smartphone deal":
    "https://images.unsplash.com/photo-1680337673571-e194b42583ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzYzMTkyODkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "money cash":
    "https://images.unsplash.com/photo-1673654884901-1b9fe1f5fdbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNoJTIwbW9uZXklMjBwcm9kdWN0fGVufDF8fHx8MTc2MzE5Mjg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "savings piggybank":
    "https://images.unsplash.com/photo-1691302174364-1958bc3d3ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWdneSUyMGJhbmslMjBzYXZpbmdzfGVufDF8fHx8MTc2MzA5NjA2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "shopping bags":
    "https://images.unsplash.com/photo-1722838630483-f67048b983be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjMxOTI4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "student education":
    "https://images.unsplash.com/photo-1606660956148-5291deb68185?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwc3R1ZGVudCUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzYzMTc2NDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "cryptocurrency bitcoin":
    "https://images.unsplash.com/photo-1659010878130-ae8b703bd3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMGJpdGNvaW58ZW58MXx8fHwxNzYzMTcyMjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// Map image placeholders to actual URLs
const adsWithImages = ads.map((ad) => ({
  ...ad,
  image: imageMap[ad.image] || ad.image,
}));

function SwipeCard({
  ad,
  onSwipe,
}: {
  ad: Ad;
  onSwipe: (direction: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0, 1, 1, 1, 0],
  );
  const [scope, animate] = useAnimate();

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? "right" : "left";
      const targetX = direction === "right" ? 800 : -800;

      // Animate the card flying off screen
      animate(
        scope.current,
        {
          x: targetX,
          opacity: 0,
          rotate: direction === "right" ? 25 : -25,
        },
        { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      ).then(() => {
        onSwipe(direction);
      });
    } else {
      // Snap back to center if not swiped far enough
      animate(
        scope.current,
        { x: 0, rotate: 0 },
        { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      );
    }
  };

  const handleButtonSwipe = async (
    direction: "left" | "right",
  ) => {
    const targetX = direction === "right" ? 800 : -800;
    await animate(
      scope.current,
      {
        x: targetX,
        opacity: 0,
        rotate: direction === "right" ? 25 : -25,
      },
      { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    );
    onSwipe(direction);
  };

  return (
    <motion.div
      ref={scope}
      style={{
        x,
        rotate,
        opacity,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full h-full"
    >
      <AdCard
        ad={ad}
        onReject={() => handleButtonSwipe("left")}
        onAccept={() => handleButtonSwipe("right")}
      />
    </motion.div>
  );
}

export default function App() {
  const [view, setView] = useState<
    "home" | "game" | "analyzer"
  >("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastDecision, setLastDecision] = useState<{
    ad: Ad;
    accepted: boolean;
  } | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [gameFinished, setGameFinished] = useState(false);
  const [isGeneratingAds, setIsGeneratingAds] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(
    () => {
      const saved = localStorage.getItem("finswipe-profile");
      return saved
        ? JSON.parse(saved)
        : {
            ageGroup: "",
            income: "",
            occupation: "",
            hobbies: [],
          };
    },
  );

  const handleProfileChange = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem(
      "finswipe-profile",
      JSON.stringify(profile),
    );

    // Trigger ad regeneration animation
    setIsGeneratingAds(true);

    // Simulate AI generation process
    setTimeout(() => {
      setIsGeneratingAds(false);
      // Here you would actually regenerate/customize ads based on profile
      // For now, we just show the animation
    }, 3000);
  };

  const handleSwipe = (direction: "left" | "right") => {
    const currentAd = adsWithImages[currentIndex];
    const userAccepted = direction === "right";
    const isCorrect =
      (currentAd.isGoodDeal && userAccepted) ||
      (!currentAd.isGoodDeal && !userAccepted);

    setLastDecision({ ad: currentAd, accepted: userAccepted });
    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    setShowResult(true);
  };

  const handleContinue = () => {
    setShowResult(false);
    setLastDecision(null);
    if (currentIndex < adsWithImages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Game finished - show final results
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setStats({ correct: 0, total: 0 });
    setGameFinished(false);
    setShowResult(false);
    setLastDecision(null);
  };

  const progress =
    ((currentIndex + 1) / adsWithImages.length) * 100;
  const currentAd = adsWithImages[currentIndex];

  // Show Generating Ads Animation
  if (isGeneratingAds) {
    return <GeneratingAds profile={userProfile} />;
  }

  // Show HomePage
  if (view === "home") {
    return (
      <HomePage
        onPlayGame={() => setView("game")}
        onAnalyzeOffer={() => setView("analyzer")}
        profile={userProfile}
        onProfileChange={handleProfileChange}
      />
    );
  }

  // Show Offer Analyzer
  if (view === "analyzer") {
    return <OfferAnalyzer onBack={() => setView("home")} />;
  }

  // Show final results if game is finished
  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <FinalResults
          correct={stats.correct}
          total={stats.total}
          onRestart={() => {
            handleRestart();
            setView("home");
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex flex-col">
      {/* Header */}
      <div className="p-3 md:p-6 pb-2 md:pb-4">
        <div className="max-w-lg mx-auto">
          {/* Back Button */}
          <div className="mb-3">
            <Button
              onClick={() => {
                handleRestart();
                setView("home");
              }}
              variant="ghost"
              className="text-white hover:bg-white/20 border-2 border-white/40 font-black"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Home
            </Button>
          </div>

          {/* Header Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-4 border-2 border-white/30 shadow-xl">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div>
                <h1 className="text-white flex items-center gap-2 md:gap-3 text-xl md:text-4xl font-black tracking-tight drop-shadow-lg">
                  <Zap className="w-6 h-6 md:w-10 md:h-10 text-yellow-300 drop-shadow-lg" />
                  SwipeWise
                </h1>
                <p className="text-sm md:text-base text-white/90 mt-0.5 md:mt-1 font-bold">
                  Check the fine print!
                </p>
              </div>
              <div className="text-right bg-white/20 rounded-xl p-2 md:p-3 border-2 border-white/40">
                <div className="flex items-center gap-1.5 md:gap-2 text-sm md:text-xl text-white font-black">
                  <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-green-300" />
                  <span>
                    {stats.correct}/{adsWithImages.length}
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-white/80 mt-0.5 font-bold uppercase tracking-wide">
                  Score
                </p>
              </div>
            </div>
            <Progress
              value={progress}
              className="h-2 md:h-3 bg-white/20"
            />
            <p className="text-xs md:text-sm text-white/80 mt-1.5 md:mt-2 font-bold text-center">
              LEVEL {currentIndex + 1} / {adsWithImages.length}
            </p>
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center p-3 md:p-6">
        <div className="relative w-full max-w-lg h-[520px] md:h-[600px]">
          {/* Background cards */}
          {currentIndex + 1 < adsWithImages.length && (
            <div className="absolute inset-0 scale-95 opacity-50 blur-[2px]">
              <AdCard ad={adsWithImages[currentIndex + 1]} />
            </div>
          )}

          {/* Current card */}
          {currentAd && (
            <SwipeCard
              key={currentAd.id}
              ad={currentAd}
              onSwipe={handleSwipe}
            />
          )}

          {/* Swipe indicators */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-8 pointer-events-none">
            <div
              className="bg-red-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full rotate-[-20deg] opacity-0 transition-opacity border-4 border-red-700 shadow-2xl"
              id="reject-indicator"
            >
              <XCircle className="w-6 h-6 md:w-10 md:h-10" />
            </div>
            <div
              className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full rotate-[20deg] opacity-0 transition-opacity border-4 border-green-700 shadow-2xl"
              id="accept-indicator"
            >
              <CheckCircle2 className="w-6 h-6 md:w-10 md:h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {/* <div className="p-3 md:p-6 pt-0">
        <div className="max-w-lg mx-auto text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-3 border-2 border-white/30">
          <p className="text-sm md:text-base text-white font-bold">
            Swipe or tap to play!
          </p>
          <p className="mt-1 text-xs md:text-sm text-white/80 font-semibold">
            Check the fine print!
          </p>
        </div>
      </div>*/}

      {/* Result Modal */}
      {showResult && lastDecision && (
        <ResultBreakdown
          ad={lastDecision.ad}
          userAccepted={lastDecision.accepted}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}