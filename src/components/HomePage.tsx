import {
  Gamepad2,
  Camera,
  Zap,
  TrendingUp,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { ProfileSettings } from "./ProfileSettings";
import { UserProfile } from "../types/profile";

interface HomePageProps {
  onPlayGame: () => void;
  onAnalyzeOffer: () => void;
  profile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
}

export function HomePage({
  onPlayGame,
  onAnalyzeOffer,
  profile,
  onProfileChange,
}: HomePageProps) {
  const [showSettings, setShowSettings] = useState(false);
  const hasProfile =
    profile.ageGroup && profile.income && profile.occupation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Profile Button - Top Right */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(true)}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-3 border-white/40 hover:border-white/60 rounded-2xl p-3 md:p-4 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2 md:gap-3 group"
          >
            <div
              className={`rounded-full p-2 md:p-2.5 ${hasProfile ? "bg-yellow-400 border-yellow-500" : "bg-white/20 border-white/40"} border-2 shadow-lg`}
            >
              <User
                className={`w-5 h-5 md:w-6 md:h-6 ${hasProfile ? "text-purple-900" : "text-white"}`}
              />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-white font-black text-sm uppercase">
                Profile
              </p>
              <p className="text-white/80 text-xs font-bold">
                {hasProfile ? "Personalized" : "Set up now"}
              </p>
            </div>
            {!hasProfile && (
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
            )}
          </button>
        </div>

        {/* Logo/Title */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-sm rounded-full mb-4 md:mb-6 border-4 border-white/40 shadow-2xl">
            <Zap className="w-10 h-10 md:w-14 md:h-14 text-yellow-300" />
          </div>
          <h1 className="text-white text-4xl md:text-7xl font-black mb-3 md:mb-4 tracking-tight drop-shadow-2xl">
            SwipeWise
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-bold max-w-2xl mx-auto leading-tight">
            Think fast, spend smart.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Play Game Card */}
          <button
            onClick={onPlayGame}
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border-4 border-white/30 hover:border-white/50 rounded-3xl p-6 md:p-8 transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 inline-flex border-4 border-white/40 group-hover:border-white/60 transition-all">
              <Gamepad2 className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>

            <h2 className="text-white text-2xl md:text-3xl font-black mb-2 md:mb-3 uppercase text-left">
              Play Ad Arkade
            </h2>

            <p className="text-white/80 text-base md:text-lg leading-relaxed text-left mb-4">
              Find legit deals vs traps!
            </p>

            <div className="flex items-center gap-2 text-yellow-300 font-black text-base md:text-lg">
              <span>Start Playing</span>
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* AI Analyzer Card */}
          <button
            onClick={onAnalyzeOffer}
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border-4 border-white/30 hover:border-white/50 rounded-3xl p-6 md:p-8 transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 inline-flex border-4 border-white/40 group-hover:border-white/60 transition-all">
              <Camera className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>

            <h2 className="text-white text-2xl md:text-3xl font-black mb-2 md:mb-3 uppercase text-left">
              Deal Scanner
            </h2>

            <p className="text-white/80 text-base md:text-lg leading-relaxed text-left mb-4">
              Scan offers, get a verdict!
            </p>

            <div className="flex items-center gap-2 text-yellow-300 font-black text-base md:text-lg">
              <span>Scan</span>
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-white/70 text-sm md:text-base font-bold">
            ©SwipeWise. All rights reserved.
          </p>
        </div>
      </div>

      {/* Profile Settings Modal */}
      <ProfileSettings
        open={showSettings}
        onClose={() => setShowSettings(false)}
        profile={profile}
        onSave={onProfileChange}
      />
    </div>
  );
}