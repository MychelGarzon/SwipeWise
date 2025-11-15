import { Ad } from "../types/ad";
import { Button } from "./ui/button";
import {
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Zap,
  Brain,
} from "lucide-react";

interface ResultBreakdownProps {
  ad: Ad;
  userAccepted: boolean;
  onContinue: () => void;
}

export function ResultBreakdown({
  ad,
  userAccepted,
  onContinue,
}: ResultBreakdownProps) {
  const isCorrectChoice =
    (ad.isGoodDeal && userAccepted) ||
    (!ad.isGoodDeal && !userAccepted);
  const shouldHaveAccepted = ad.isGoodDeal && !userAccepted;
  const shouldHaveRejected = !ad.isGoodDeal && userAccepted;

  // Calculate the actual financial impact based on user's decision
  const getFinancialImpact = () => {
    if (userAccepted) {
      // If accepted, show the actual year cost
      return {
        amount: Math.abs(ad.breakdown.yearCost),
        isPositive: ad.breakdown.yearCost < 0,
        label:
          ad.breakdown.yearCost < 0 ? "💰 Saved" : "💸 Lost",
        description:
          ad.breakdown.yearCost < 0
            ? `By accepting this deal, you'd save €${Math.abs(ad.breakdown.yearCost)} over one year!`
            : `By accepting this deal, you'd lose €${Math.abs(ad.breakdown.yearCost)} over one year!`,
      };
    } else {
      // If rejected
      if (ad.isGoodDeal) {
        // Rejected a good deal - missed savings
        return {
          amount: Math.abs(ad.breakdown.yearCost),
          isPositive: false,
          label: "💔 Missed",
          description: `By rejecting this deal, you missed out on €${Math.abs(ad.breakdown.yearCost)} in potential savings!`,
        };
      } else {
        // Rejected a bad deal - avoided loss
        return {
          amount: Math.abs(ad.breakdown.yearCost),
          isPositive: true,
          label: "🛡️ Avoided",
          description: `By rejecting this deal, you avoided losing €${Math.abs(ad.breakdown.yearCost)} over one year!`,
        };
      }
    }
  };

  const financialImpact = getFinancialImpact();

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[24px] md:rounded-[32px] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(168,85,247,0.6)] border-4 border-purple-500">
        {/* Header */}
        <div
          className={`p-3 md:p-8 border-b-4 ${isCorrectChoice ? "bg-gradient-to-r from-green-400 to-emerald-400 border-green-600" : "bg-gradient-to-r from-red-400 to-pink-400 border-red-600"}`}
        >
          <div className="flex items-start gap-2 md:gap-4">
            {isCorrectChoice ? (
              <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-white flex-shrink-0 drop-shadow-lg" />
            ) : (
              <AlertCircle className="w-8 h-8 md:w-12 md:h-12 text-white flex-shrink-0 drop-shadow-lg" />
            )}
            <div className="flex-1">
              <h2 className="text-white text-2xl md:text-4xl font-black tracking-tight mb-1 md:mb-2 drop-shadow-lg">
                {isCorrectChoice
                  ? "Correct!"
                  : "That's a trap!"}
              </h2>
              <p className="text-sm md:text-lg text-white/90 font-bold">
                You {userAccepted ? "accepted" : "rejected"}{" "}
                this offer
              </p>
            </div>
          </div>
        </div>

        {/* Financial Impact */}
        <div className="p-3 md:p-8 space-y-3 md:space-y-6">
          {/* Year impact */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              {financialImpact.isPositive ? (
                <TrendingUp className="w-5 h-5 md:w-7 md:h-7 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 md:w-7 md:h-7 text-red-600" />
              )}
              <h3 className="text-purple-900 text-base md:text-2xl font-black">
                Financial impact in 1 year
              </h3>
            </div>
            <div
              className={`p-3 md:p-6 rounded-xl md:rounded-2xl border-4 shadow-lg ${financialImpact.isPositive ? "bg-gradient-to-br from-green-100 to-emerald-100 border-green-500" : "bg-gradient-to-br from-red-100 to-pink-100 border-red-500"}`}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-3xl md:text-6xl font-black tracking-tight ${financialImpact.isPositive ? "text-green-700" : "text-red-700"}`}
                >
                  {financialImpact.isPositive ? "+" : "-"}€
                  {financialImpact.amount}
                </span>
                <span className="text-gray-700 text-sm md:text-xl font-bold">
                  {financialImpact.label}
                </span>
              </div>
              <p className="text-gray-700 text-xs md:text-base font-bold mt-2">
                {financialImpact.description}
              </p>
            </div>
          </div>

          {/* Hidden Fees/Benefits */}
          {ad.breakdown.hiddenFees.length > 0 && (
            <div className="bg-white/50 rounded-xl p-2.5 md:p-4 border-2 border-purple-300">
              <h3 className="text-purple-900 text-base md:text-xl font-black mb-2 md:mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 md:w-5 md:h-5" />
                {ad.isGoodDeal ? "The Perks" : "The Traps"}
              </h3>
              <ul className="space-y-1.5 md:space-y-2">
                {ad.breakdown.hiddenFees.map((fee, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm md:text-base text-gray-800 font-semibold"
                  >
                    <span className="text-purple-500 mt-0.5 text-base md:text-xl font-black">
                      •
                    </span>
                    <span className="leading-tight">{fee}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Marketing Tricks - AI Analysis */}
          {ad.marketingTricks &&
            ad.marketingTricks.length > 0 && (
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-2.5 md:p-4 border-2 border-orange-400">
                <h3 className="text-orange-900 text-base md:text-xl font-black mb-2 md:mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4 md:w-5 md:h-5" />
                  Marketing tricks used in this ad
                </h3>
                <div className="space-y-2.5 md:space-y-3">
                  {ad.marketingTricks.map((trick, index) => (
                    <div
                      key={index}
                      className="bg-white/60 rounded-lg p-2 md:p-3 border border-orange-300"
                    >
                      <h4 className="text-orange-900 text-sm md:text-base font-black mb-1">
                        {trick.name}
                      </h4>
                      <p className="text-gray-700 text-xs md:text-sm leading-tight font-semibold">
                        {trick.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Verdict */}
          <div className="bg-white/50 rounded-xl p-2.5 md:p-4 border-2 border-purple-300">
            <h3 className="text-purple-900 text-base md:text-xl font-black mb-2 md:mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
              The truth
            </h3>
            <p className="text-gray-800 text-sm md:text-base leading-tight md:leading-relaxed font-semibold">
              {ad.breakdown.verdict}
            </p>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-2.5 md:p-4 border-2 border-blue-400">
            <h3 className="text-blue-900 text-base md:text-xl font-black mb-2 md:mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              Pro tips
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              {ad.breakdown.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm md:text-base text-blue-900 font-semibold"
                >
                  <span className="text-cyan-600 mt-0.5 text-base md:text-xl font-black">
                    →
                  </span>
                  <span className="leading-tight">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Continue Button */}
        <div className="p-3 md:p-8 pt-0">
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 active:scale-95 text-white text-base md:text-2xl font-black py-3 md:py-5 rounded-xl md:rounded-2xl border-b-4 border-purple-900 hover:border-purple-950 transition-all shadow-xl hover:shadow-2xl tracking-wide flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 md:w-7 md:h-7" />
            Keep going!
          </button>
        </div>
      </div>
    </div>
  );
}