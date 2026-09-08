import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';

interface ConfidenceBadgeProps {
  score: number;
  note?: string;
  onHelpClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  score,
  note,
  onHelpClick,
  size = 'md'
}) => {
  let colorStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let dotColor = 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]';

  if (score < 70) {
    colorStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    dotColor = 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]';
  } else if (score < 85) {
    colorStyle = 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    dotColor = 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]';
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <div className="group relative inline-flex items-center gap-1.5">
      <div className={`inline-flex items-center gap-1.5 rounded-full border ${colorStyle} ${padding} font-medium transition-all`}>
        <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
        <span>Context confidence: <strong className="font-bold">{score}%</strong></span>
      </div>

      {note && (
        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          <div className="bg-[#181A26] text-slate-200 text-xs rounded-lg p-2.5 shadow-xl border border-slate-700/60 leading-relaxed">
            <div className="flex items-center gap-1 font-semibold text-purple-300 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              AI Memory Score
            </div>
            {note}
          </div>
        </div>
      )}

      {onHelpClick && (
        <button
          onClick={onHelpClick}
          className="text-slate-400 hover:text-slate-200 transition-colors p-0.5"
          title="Why this confidence score?"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
