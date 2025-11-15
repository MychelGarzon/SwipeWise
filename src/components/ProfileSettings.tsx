import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { UserProfile, AGE_GROUPS, INCOME_LEVELS, OCCUPATIONS, HOBBIES } from "../types/profile";
import { Sparkles } from "lucide-react";

interface ProfileSettingsProps {
  open: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export function ProfileSettings({ open, onClose, profile, onSave }: ProfileSettingsProps) {
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);

  const handleHobbyToggle = (hobby: string) => {
    setLocalProfile(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  const handleSave = () => {
    onSave(localProfile);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-500">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-3xl font-black text-purple-900 uppercase">
            <Sparkles className="w-8 h-8 text-pink-500" />
            Profile Settings
          </DialogTitle>
          <DialogDescription className="text-purple-700 font-bold mt-2">
            Personalize your experience! We'll tailor ads based on your profile to make learning more relevant.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Age Group */}
          <div className="space-y-2">
            <Label htmlFor="age-group" className="text-purple-900 font-black text-lg">
              Age Group
            </Label>
            <Select
              value={localProfile.ageGroup}
              onValueChange={(value) => setLocalProfile(prev => ({ ...prev, ageGroup: value }))}
            >
              <SelectTrigger className="bg-white border-2 border-purple-300 font-bold">
                <SelectValue placeholder="Select your age group" />
              </SelectTrigger>
              <SelectContent>
                {AGE_GROUPS.map((age) => (
                  <SelectItem key={age} value={age} className="font-bold">
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Income Level */}
          <div className="space-y-2">
            <Label htmlFor="income" className="text-purple-900 font-black text-lg">
              Income Level
            </Label>
            <Select
              value={localProfile.income}
              onValueChange={(value) => setLocalProfile(prev => ({ ...prev, income: value }))}
            >
              <SelectTrigger className="bg-white border-2 border-purple-300 font-bold">
                <SelectValue placeholder="Select your income level" />
              </SelectTrigger>
              <SelectContent>
                {INCOME_LEVELS.map((income) => (
                  <SelectItem key={income} value={income} className="font-bold">
                    {income}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-purple-900 font-black text-lg">
              Occupation
            </Label>
            <Select
              value={localProfile.occupation}
              onValueChange={(value) => setLocalProfile(prev => ({ ...prev, occupation: value }))}
            >
              <SelectTrigger className="bg-white border-2 border-purple-300 font-bold">
                <SelectValue placeholder="Select your occupation" />
              </SelectTrigger>
              <SelectContent>
                {OCCUPATIONS.map((occupation) => (
                  <SelectItem key={occupation} value={occupation} className="font-bold">
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hobbies */}
          <div className="space-y-3">
            <Label className="text-purple-900 font-black text-lg">
              Hobbies & Interests
            </Label>
            <p className="text-sm text-purple-700 font-bold">
              Select all that apply
            </p>
            <div className="grid grid-cols-2 gap-3">
              {HOBBIES.map((hobby) => (
                <div key={hobby} className="flex items-center space-x-2 bg-white p-3 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <Checkbox
                    id={hobby}
                    checked={localProfile.hobbies.includes(hobby)}
                    onCheckedChange={() => handleHobbyToggle(hobby)}
                    className="border-2 border-purple-400"
                  />
                  <label
                    htmlFor={hobby}
                    className="text-sm font-bold text-purple-900 cursor-pointer flex-1"
                  >
                    {hobby}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* AI Notice */}
          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-cyan-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-black text-cyan-900 mb-1">AI-Powered Personalization</h4>
                <p className="text-sm text-cyan-800 font-semibold">
                  Based on your profile, we'll generate realistic ads tailored to offers you're likely to encounter. 
                  This helps you learn to identify deceptive deals in situations relevant to your life!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-2 border-purple-300 font-black text-purple-900 hover:bg-purple-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-black border-b-4 border-purple-900"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Save Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}