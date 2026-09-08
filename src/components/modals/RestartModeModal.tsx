import React from 'react';
import { X, Play, Sparkles, CheckCircle2, ArrowRight, Compass, Zap, Flame } from 'lucide-react';
import { Project, ContextSnapshot } from '../../types';

interface RestartModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  snapshot: ContextSnapshot;
  onStartFocusSession: () => void;
}

export const RestartModeModal: React.FC<RestartModeModalProps> = ({
  isOpen,
  onClose,
  project,
  snapshot,
  onStartFocusSession
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080D]/95 backdrop-blur-xl p-4 md:p-8 animate-in fade-in duration-300">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-[#0E0F1A] border border-purple-500/30 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl shadow-purple-950/80 relative z-10">
        
        {/* Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400" />

        <div className="p-8 md:p-10 space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 uppercase flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                PICKING UP FROM LAST TIME
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {snapshot.timeDisplay}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Project Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              {project.name}
            </h1>
            <p className="text-sm text-purple-300/80 mt-1 font-mono">
              AI Context Reconstruction • 94% Confidence
            </p>
          </div>

          {/* LAST TIME Structured Briefing */}
          <div className="bg-[#141626] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-inner">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              LAST TIME BRIEFING
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3 bg-[#1A1C30] rounded-xl border border-slate-800">
                <span className="text-slate-400 font-mono uppercase text-[10px] block mb-1">You completed</span>
                <span className="text-slate-100 font-medium">Stakeholder mapping & user segmentation</span>
              </div>

              <div className="p-3 bg-[#1A1C30] rounded-xl border border-slate-800">
                <span className="text-purple-300 font-mono uppercase text-[10px] block mb-1">You discovered</span>
                <span className="text-slate-100 font-medium">Primary issue is inconsistent access to training resources</span>
              </div>

              <div className="p-3 bg-[#1A1C30] rounded-xl border border-slate-800">
                <span className="text-slate-400 font-mono uppercase text-[10px] block mb-1">You were working on</span>
                <span className="text-slate-100 font-medium">Quantifying the impact metrics</span>
              </div>

              <div className="p-3 bg-[#1A1C30] rounded-xl border border-slate-800">
                <span className="text-blue-300 font-mono uppercase text-[10px] block mb-1">You planned to</span>
                <span className="text-slate-100 font-medium">Create three measurable metrics</span>
              </div>
            </div>
          </div>

          {/* START HERE Callout Box */}
          <div className="p-6 bg-gradient-to-r from-purple-950/60 via-[#181A32] to-indigo-950/60 rounded-2xl border border-purple-500/40 shadow-xl space-y-3">
            <div className="text-xs font-mono uppercase text-purple-300 font-extrabold tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400 fill-purple-400" />
                START HERE
              </span>
              <span className="text-xs font-mono text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded border border-purple-500/30">
                Estimated time: ~25 minutes
              </span>
            </div>

            <div className="text-xl md:text-2xl font-black text-white">
              {snapshot.nextStep}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              "Your working brain is handed right back to you. No setup delay, no forgotten contexts."
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-end gap-4 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-3 text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              Exit Restart Mode
            </button>

            <button
              onClick={() => {
                onClose();
                onStartFocusSession();
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-2xl shadow-purple-950/80 hover:shadow-purple-600/40 border border-purple-300/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group"
            >
              <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              Start Focus Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-purple-200" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
