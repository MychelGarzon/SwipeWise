import { CheckCircle2, XCircle, Trophy, Target, BookOpen, ExternalLink, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FinalResultsProps {
  correct: number;
  total: number;
  onRestart: () => void;
}

interface ScoreAssessment {
  title: string;
  message: string;
  icon: 'trophy' | 'target' | 'book';
  color: string;
  bgGradient: string;
}

const getAssessment = (score: number): ScoreAssessment => {
  const percentage = (score / 8) * 100;
  
  if (percentage >= 87.5) {
    return {
      title: "Financial Genius! 🎯",
      message: "You're crushing it! You have excellent instincts for spotting good and bad financial deals. Keep this sharp thinking as you navigate real-world financial decisions!",
      icon: 'trophy',
      color: 'text-yellow-300',
      bgGradient: 'from-yellow-400 via-orange-400 to-pink-500'
    };
  } else if (percentage >= 62.5) {
    return {
      title: "Getting There! 💪",
      message: "You're on the right track! You caught some of the tricky deals, but there's room to sharpen your financial radar. Review the resources below to level up!",
      icon: 'target',
      color: 'text-blue-300',
      bgGradient: 'from-blue-400 via-purple-400 to-pink-500'
    };
  } else {
    return {
      title: "Keep Learning! 📚",
      message: "Financial literacy takes practice! Don't worry - everyone starts somewhere. Check out the resources below to build your financial superpowers!",
      icon: 'book',
      color: 'text-purple-300',
      bgGradient: 'from-purple-400 via-pink-400 to-red-500'
    };
  }
};

const learningResources = [
  {
    title: "Suomi.fi - Talous ja verotus",
    description: "Finnish government's official financial guidance and tax resources",
    url: "https://www.suomi.fi/aihe/talous-ja-verotus"
  },
  {
    title: "Finanssivalvonta",
    description: "Finnish Financial Supervisory Authority consumer education",
    url: "https://www.finanssivalvonta.fi/en/consumer-protection/"
  },
  {
    title: "Takuu-Säätiö Financial Literacy",
    description: "Free Finnish courses on personal finance and money management",
    url: "https://www.takuusaatio.fi/"
  },
  {
    title: "EU Money Skills",
    description: "European Commission's financial education resources for young people",
    url: "https://www.eumoneyweek.eu/"
  }
];

export function FinalResults({ correct, total, onRestart }: FinalResultsProps) {
  const assessment = getAssessment(correct);
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="min-h-screen bg-black/80 backdrop-blur-md flex items-start justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full py-4 md:py-6 my-auto">
        {/* Score Display */}
        <div className={`bg-gradient-to-br ${assessment.bgGradient} rounded-3xl p-1 mb-4 md:mb-6 shadow-2xl border-4 border-white/30`}>
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 md:p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full mb-3 md:mb-4 border-4 border-white/40">
                {assessment.icon === 'trophy' && <Trophy className={`w-8 h-8 md:w-12 md:h-12 ${assessment.color}`} />}
                {assessment.icon === 'target' && <Target className={`w-8 h-8 md:w-12 md:h-12 ${assessment.color}`} />}
                {assessment.icon === 'book' && <BookOpen className={`w-8 h-8 md:w-12 md:h-12 ${assessment.color}`} />}
              </div>
              
              <h2 className="text-white text-2xl md:text-5xl font-black mb-2 md:mb-3 uppercase tracking-tight">
                {assessment.title}
              </h2>
              
              <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
                <div className="bg-white/20 rounded-xl px-4 py-2 md:px-6 md:py-3 border-2 border-white/40">
                  <div className="flex items-center gap-1 md:gap-2">
                    <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8 text-green-300" />
                    <span className="text-2xl md:text-4xl font-black text-white">{correct}</span>
                  </div>
                  <p className="text-xs md:text-sm text-white/80 font-bold uppercase">Correct</p>
                </div>
                
                <div className="bg-white/20 rounded-xl px-4 py-2 md:px-6 md:py-3 border-2 border-white/40">
                  <div className="flex items-center gap-1 md:gap-2">
                    <XCircle className="w-5 h-5 md:w-8 md:h-8 text-red-300" />
                    <span className="text-2xl md:text-4xl font-black text-white">{total - correct}</span>
                  </div>
                  <p className="text-xs md:text-sm text-white/80 font-bold uppercase">Wrong</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl px-5 py-1.5 md:px-6 md:py-2 inline-block mb-3 md:mb-4 border-2 border-yellow-500 shadow-lg">
                <span className="text-xl md:text-3xl font-black text-black">{percentage}%</span>
              </div>
              
              <p className="text-white/90 text-sm md:text-lg leading-relaxed max-w-xl mx-auto">
                {assessment.message}
              </p>
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border-2 border-white/30 mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full p-2 md:p-3 border-2 border-white/40">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-white text-lg md:text-2xl font-black uppercase">
              Level Up Your Money Skills
            </h3>
          </div>
          
          <div className="space-y-2 md:space-y-3">
            {learningResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/10 hover:bg-white/20 rounded-xl p-3 md:p-4 border-2 border-white/20 hover:border-white/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 md:gap-3">
                  <div className="flex-1">
                    <h4 className="text-white font-black text-sm md:text-lg mb-0.5 md:mb-1 group-hover:text-cyan-300 transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-white/70 text-xs md:text-base">
                      {resource.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-cyan-300 transition-colors flex-shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Restart Button */}
        <Button
          onClick={onRestart}
          className="w-full bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 border-b-4 border-green-700 hover:border-green-800 rounded-xl py-4 md:py-6 text-white text-lg md:text-xl font-black uppercase tracking-wide transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 md:gap-3"
        >
          <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
          Play Again!
        </Button>
      </div>
    </div>
  );
}