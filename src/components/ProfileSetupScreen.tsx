import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { UserProfile, AGE_GROUPS, INCOME_LEVELS, OCCUPATIONS, HOBBIES } from "../types/profile";
import { Sparkles, Zap, TrendingUp } from "lucide-react";

interface ProfileSetupScreenProps {
  onComplete: (profile: UserProfile) => void;
}

export function ProfileSetupScreen({ onComplete }: ProfileSetupScreenProps) {
  const [profile, setProfile] = useState<UserProfile>({
    ageGroup: '',
    income: '',
    occupation: '',
    hobbies: []
  });

  const handleHobbyToggle = (hobby: string) => {
    setProfile(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  const isComplete = profile.ageGroup && profile.income && profile.occupation && profile.hobbies.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6 border-4 border-white/40 shadow-2xl">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" />
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight drop-shadow-2xl">
            Welcome to FinSwipe!
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-bold max-w-2xl mx-auto leading-tight mb-2">
            Let's personalize your experience
          </p>
          <p className="text-white/70 text-base md:text-lg font-bold max-w-2xl mx-auto">
            We'll tailor ads to match your life so you can spot real-world traps! 🎯
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border-4 border-white/30 p-6 md:p-10 shadow-2xl">
          <div className="space-y-6">
            {/* Age Group */}
            <div className="space-y-3">
              <Label className="text-white text-lg md:text-xl font-black uppercase flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                How old are you?
              </Label>
              <Select
                value={profile.ageGroup}
                onValueChange={(value) => setProfile({ ...profile, ageGroup: value })}
              >
                <SelectTrigger className="w-full bg-white/90 border-3 border-purple-300 text-purple-900 font-bold text-base md:text-lg h-12 md:h-14">
                  <SelectValue placeholder="Select your age group" />
                </SelectTrigger>
                <SelectContent>
                  {AGE_GROUPS.map((age) => (
                    <SelectItem key={age} value={age} className="font-bold text-base">
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Income Level */}
            <div className="space-y-3">
              <Label className="text-white text-lg md:text-xl font-black uppercase flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                What's your income level?
              </Label>
              <Select
                value={profile.income}
                onValueChange={(value) => setProfile({ ...profile, income: value })}
              >
                <SelectTrigger className="w-full bg-white/90 border-3 border-purple-300 text-purple-900 font-bold text-base md:text-lg h-12 md:h-14">
                  <SelectValue placeholder="Select your income" />
                </SelectTrigger>
                <SelectContent>
                  {INCOME_LEVELS.map((income) => (
                    <SelectItem key={income} value={income} className="font-bold text-base">
                      {income}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Occupation */}
            <div className="space-y-3">
              <Label className="text-white text-lg md:text-xl font-black uppercase flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                What do you do?
              </Label>
              <Select
                value={profile.occupation}
                onValueChange={(value) => setProfile({ ...profile, occupation: value })}
              >
                <SelectTrigger className="w-full bg-white/90 border-3 border-purple-300 text-purple-900 font-bold text-base md:text-lg h-12 md:h-14">
                  <SelectValue placeholder="Select your occupation" />
                </SelectTrigger>
                <SelectContent>
                  {OCCUPATIONS.map((occupation) => (
                    <SelectItem key={occupation} value={occupation} className="font-bold text-base">
                      {occupation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Hobbies */}
            <div className="space-y-3">
              <Label className="text-white text-lg md:text-xl font-black uppercase flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                What are your hobbies? (Select all that apply)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {HOBBIES.map((hobby) => (
                  <label
                    key={hobby}
                    className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-3 cursor-pointer transition-all ${
                      profile.hobbies.includes(hobby)
                        ? 'bg-yellow-300 border-yellow-500 shadow-lg'
                        : 'bg-white/90 border-purple-300 hover:bg-white hover:border-purple-400'
                    }`}
                  >
                    <Checkbox
                      checked={profile.hobbies.includes(hobby)}
                      onCheckedChange={() => handleHobbyToggle(hobby)}
                      className="border-2"
                    />
                    <span className={`font-bold text-sm md:text-base ${
                      profile.hobbies.includes(hobby) ? 'text-purple-900' : 'text-gray-700'
                    }`}>
                      {hobby}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-8">
            <button
              onClick={() => onComplete(profile)}
              disabled={!isComplete}
              className={`w-full text-white text-xl md:text-2xl font-black py-4 md:py-6 rounded-2xl border-b-4 transition-all shadow-xl flex items-center justify-center gap-3 ${
                isComplete
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-green-700 hover:border-green-800 hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-gray-400 border-gray-500 cursor-not-allowed opacity-50'
              }`}
            >
              <Sparkles className="w-6 h-6 md:w-7 md:h-7" />
              {isComplete ? "Let's Go!" : 'Complete All Fields'}
              <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            {!isComplete && (
              <p className="text-white/70 text-sm md:text-base font-bold text-center mt-3">
                Fill in all fields to continue
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm md:text-base font-bold">
            Your info stays private - used only for personalization 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
