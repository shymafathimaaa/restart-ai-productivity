import React from 'react';
import { X, Sparkles, Clock, CheckCircle, ArrowRight, Play, Flame } from 'lucide-react';
import { DailyBrief } from '../../types';

interface DailyBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  brief: DailyBrief;
  onStartRestart: () => void;
}

export const DailyBriefModal: React.FC<DailyBriefModalProps> = ({
  isOpen,
  onClose,
  brief,
  onStartRestart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#121422] border border-purple-500/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl shadow-purple-950/50 relative">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Morning Intelligence Brief
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight mb-2 flex items-center gap-2">
            Your Restart Brief
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400/20" />
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Yesterday you worked on <strong className="text-purple-300">SIH Prototype</strong> for{' '}
            <span className="font-mono bg-purple-950/60 text-purple-200 px-2 py-0.5 rounded border border-purple-500/30 font-semibold">{brief.timeWorked}</span>.
          </p>

          <div className="space-y-4 mb-6">
            {/* Completed */}
            <div className="p-3.5 bg-[#181A2A] rounded-xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                You completed yesterday
              </div>
              <ul className="space-y-1.5 text-sm text-slate-200 pl-2">
                {brief.completedList.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stopped At */}
            <div className="p-3.5 bg-[#181A2A] rounded-xl border border-slate-800">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                You stopped while working on
              </div>
              <div className="text-sm font-medium text-slate-200">
                {brief.stoppedTask}
              </div>
            </div>

            {/* Recommended Next Step */}
            <div className="p-4 bg-gradient-to-r from-purple-950/50 to-indigo-950/50 rounded-xl border border-purple-500/40 shadow-inner">
              <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Today's best next step</span>
                <span className="text-[11px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                  ~{brief.estMinutes} mins
                </span>
              </div>
              <div className="text-base font-bold text-white mb-1">
                {brief.recommendedNextStep}
              </div>
              <p className="text-xs text-purple-300/80">
                AI reconstructed your cognitive state with 94% context confidence.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onStartRestart();
              }}
              className="flex-1 px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-950/50 hover:shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group text-sm"
            >
              <Play className="w-4 h-4 fill-white group-hover:translate-x-0.5 transition-transform" />
              Start where I left off
              <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
