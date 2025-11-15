import { motion } from "motion/react";
import { Sparkles, Zap, Target, Brain } from "lucide-react";
import { UserProfile } from "../types/profile";

interface GeneratingAdsProps {
  profile: UserProfile;
}

export function GeneratingAds({ profile }: GeneratingAdsProps) {
  const profileTags = [
    profile.ageGroup && `Age ${profile.ageGroup}`,
    profile.occupation,
    profile.income && "Income Level",
    ...profile.hobbies.slice(0, 3)
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 z-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Animation Container */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-4 border-white/40 shadow-2xl">
          {/* Icon Animation */}
          <div className="flex justify-center mb-8">
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full p-6 border-4 border-white/60 shadow-xl">
                <Brain className="w-16 h-16 text-white" />
              </div>
              
              {/* Orbiting Icons */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 text-yellow-300" />
              </motion.div>
              
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 text-cyan-300" />
              </motion.div>
              
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <Target className="absolute top-1/2 -right-2 -translate-y-1/2 w-8 h-8 text-pink-300" />
              </motion.div>
            </motion.div>
          </div>

          {/* Text */}
          <div className="text-center mb-8">
            <motion.h2
              className="text-white text-3xl md:text-4xl font-black mb-3 uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI Generating...
            </motion.h2>
            <p className="text-white/90 text-lg font-bold">
              Creating personalized offers just for you!
            </p>
          </div>

          {/* Profile Tags */}
          {profileTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {profileTags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full px-4 py-2 text-white font-black text-sm"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          )}

          {/* Progress Dots */}
          <div className="flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 rounded-full bg-white"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Status Messages */}
          <div className="mt-8 space-y-2">
            {[
              "Analyzing your preferences...",
              "Finding relevant offers...",
              "Customizing content...",
            ].map((message, index) => (
              <motion.div
                key={message}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  duration: 0.5,
                }}
                className="text-center text-white/70 text-sm font-bold"
              >
                {message}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
