import { Ad } from '../types/ad';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { X, Check } from 'lucide-react';

interface AdCardProps {
  ad: Ad;
  style?: React.CSSProperties;
  onReject?: () => void;
  onAccept?: () => void;
}

export function AdCard({ ad, style, onReject, onAccept }: AdCardProps) {
  return (
    <div
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      style={style}
    >
      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-[24px] md:rounded-[32px] shadow-[0_0_30px_rgba(168,85,247,0.4)] border-4 border-purple-400 overflow-hidden relative">
        {/* Full Card Image */}
        <ImageWithFallback
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover absolute inset-0"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8">
          {/* Title at Top */}
          <div>
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">
              {ad.title}
            </h1>
          </div>

          {/* Bottom Content */}
          <div className="space-y-3 md:space-y-4">
            {/* Subtitle */}
            <p className="text-white text-xl md:text-2xl font-bold leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {ad.subtitle}
            </p>

            {/* Terms & Conditions */}
            <div className="space-y-2 md:space-y-3">
              <p className="text-white/90 text-sm md:text-sm font-black uppercase tracking-widest drop-shadow-lg">
                Fine Print
              </p>
              <div className="flex flex-wrap gap-1.5 md:gap-2.5">
                {ad.terms.map((term, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm md:text-sm leading-snug py-1.5 md:py-2 px-2.5 md:px-3.5 border-2 border-white/40 bg-black/60 backdrop-blur-sm text-white rounded-full font-bold shadow-lg"
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-6">
              <button
                onClick={onReject}
                className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 border-b-4 border-red-700 hover:border-red-800 rounded-xl md:rounded-2xl py-3 md:py-4 px-3 md:px-4 text-white text-lg md:text-xl font-black uppercase tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-1.5 md:gap-2"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
                <span>Reject</span>
              </button>
              <button
                onClick={onAccept}
                className="flex-1 bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 active:scale-95 border-b-4 border-green-700 hover:border-green-800 rounded-xl md:rounded-2xl py-3 md:py-4 px-3 md:px-4 text-white text-lg md:text-xl font-black uppercase tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-1.5 md:gap-2"
              >
                <Check className="w-5 h-5 md:w-6 md:h-6" />
                <span>Accept</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}