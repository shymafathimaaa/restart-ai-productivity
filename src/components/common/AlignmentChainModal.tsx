import React from 'react';
import { X, ArrowDown, Target, Flag, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { AlignmentChain } from '../../types';

interface AlignmentChainModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  chain: AlignmentChain;
}

export const AlignmentChainModal: React.FC<AlignmentChainModalProps> = ({
  isOpen,
  onClose,
  projectName,
  chain
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#121420] border border-purple-500/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl shadow-purple-950/40 relative">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500" />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs tracking-wider uppercase font-semibold">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Context Alignment Chain
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-white mb-1">Why am I doing this?</h2>
          <p className="text-sm text-slate-400 mb-6">
            Connecting your immediate action back to your overarching vision for <strong className="text-slate-200">{projectName}</strong>.
          </p>

          {/* Vertical Hierarchy Chain */}
          <div className="space-y-3 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-purple-500/60 before:via-blue-500/40 before:to-indigo-500/60">
            
            {/* Step 1: Goal */}
            <div className="relative pl-12 p-3.5 bg-[#181A2A] rounded-xl border border-slate-800/80 hover:border-purple-500/30 transition-all">
              <div className="absolute left-3.5 top-3.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-300">
                <Target className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold mb-0.5">High-Level Goal</div>
              <div className="text-sm font-medium text-slate-100">{chain.goal}</div>
            </div>

            <div className="flex justify-center text-slate-600 my-1 pl-4">
              <ArrowDown className="w-4 h-4 text-purple-400/60 animate-bounce" />
            </div>

            {/* Step 2: Milestone */}
            <div className="relative pl-12 p-3.5 bg-[#181A2A] rounded-xl border border-slate-800/80 hover:border-blue-500/30 transition-all">
              <div className="absolute left-3.5 top-3.5 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-300">
                <Flag className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-semibold mb-0.5">Key Milestone</div>
              <div className="text-sm font-medium text-slate-100">{chain.milestone}</div>
            </div>

            <div className="flex justify-center text-slate-600 my-1 pl-4">
              <ArrowDown className="w-4 h-4 text-blue-400/60 animate-bounce" />
            </div>

            {/* Step 3: Current Task */}
            <div className="relative pl-12 p-3.5 bg-[#181A2A] rounded-xl border border-slate-800/80 hover:border-indigo-500/30 transition-all">
              <div className="absolute left-3.5 top-3.5 w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-0.5">Current Task</div>
              <div className="text-sm font-medium text-slate-100">{chain.currentTask}</div>
            </div>

            <div className="flex justify-center text-slate-600 my-1 pl-4">
              <ArrowDown className="w-4 h-4 text-indigo-400/60 animate-bounce" />
            </div>

            {/* Step 4: Next Action */}
            <div className="relative pl-12 p-3.5 bg-gradient-to-r from-purple-950/40 to-indigo-950/40 rounded-xl border border-purple-500/40 shadow-lg shadow-purple-950/30">
              <div className="absolute left-3.5 top-3.5 w-6 h-6 rounded-full bg-purple-500 border border-purple-300 flex items-center justify-center text-white shadow-md shadow-purple-500/50">
                <Zap className="w-3.5 h-3.5 fill-white" />
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-0.5 flex items-center gap-1.5">
                Immediate Next Action
                <span className="text-[9px] bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded font-sans">Active Focus</span>
              </div>
              <div className="text-sm font-semibold text-white">{chain.nextAction}</div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Aligned with 100% confidence
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
            >
              Got it, let's work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
