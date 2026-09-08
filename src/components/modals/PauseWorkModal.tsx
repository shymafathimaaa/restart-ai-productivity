import React, { useState } from 'react';
import { X, Sparkles, FileText, CheckCircle2, Save, HelpCircle, ShieldCheck } from 'lucide-react';
import { Project, ContextSnapshot } from '../../types';

interface PauseWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  latestSnapshot: ContextSnapshot;
  onSavePause: (updatedSnapshot: Partial<ContextSnapshot>) => void;
}

export const PauseWorkModal: React.FC<PauseWorkModalProps> = ({
  isOpen,
  onClose,
  project,
  latestSnapshot,
  onSavePause
}) => {
  const [accomplishment, setAccomplishment] = useState(latestSnapshot.accomplishment);
  const [thought, setThought] = useState(latestSnapshot.thought);
  const [continuationPoint, setContinuationPoint] = useState(latestSnapshot.continuationPoint);
  const [nextStep, setNextStep] = useState(latestSnapshot.nextStep);
  const [confidence, setConfidence] = useState(latestSnapshot.confidence);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePause({
      accomplishment,
      thought,
      continuationPoint,
      nextStep,
      confidence
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#121422] border border-purple-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-950/60 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500" />
        
        <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              AI Context Auto-Snapshot
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title Header */}
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Before you go...
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              RE:START is capturing your exact mental context for <strong className="text-purple-300">{project.name}</strong> so you can restart instantly when you return.
            </p>
          </div>

          {/* Snapshot Fields */}
          <div className="space-y-4">
            
            {/* Field 1: Accomplished */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center justify-between">
                <span>What you accomplished</span>
                <span className="text-[10px] text-slate-400 font-sans font-normal">Editable</span>
              </label>
              <textarea
                value={accomplishment}
                onChange={(e) => setAccomplishment(e.target.value)}
                rows={2}
                className="w-full bg-[#181A2A] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 font-sans"
              />
            </div>

            {/* Field 2: What you were thinking */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-bold flex items-center justify-between">
                <span>What you were thinking</span>
                <span className="text-[10px] text-slate-400 font-sans font-normal">Editable</span>
              </label>
              <textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                rows={2}
                className="w-full bg-[#181A2A] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 font-sans"
              />
            </div>

            {/* Field 3: Where to continue */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-blue-300 font-bold flex items-center justify-between">
                <span>Where to continue</span>
                <span className="text-[10px] text-slate-400 font-sans font-normal">Editable</span>
              </label>
              <input
                type="text"
                value={continuationPoint}
                onChange={(e) => setContinuationPoint(e.target.value)}
                className="w-full bg-[#181A2A] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 font-sans"
              />
            </div>

            {/* Field 4: Files / Resources */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Linked Files & Resources
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {latestSnapshot.files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    <span>{file.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{file.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Field 5: Your next step */}
            <div className="space-y-1.5 p-4 bg-gradient-to-r from-purple-950/40 to-indigo-950/40 rounded-xl border border-purple-500/40">
              <label className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center justify-between">
                <span>Your next immediate step</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded font-sans">
                  High Priority
                </span>
              </label>
              <input
                type="text"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                className="w-full bg-[#141624] border border-purple-500/40 rounded-lg p-2.5 text-sm font-semibold text-white focus:outline-none focus:border-purple-400 font-sans"
              />
            </div>

            {/* Context Confidence Slider / Rating */}
            <div className="flex items-center justify-between p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Estimated Context Confidence:</span>
                <strong className="text-emerald-400 font-mono font-bold text-sm">{confidence}%</strong>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                🟢 Clear restart point verified
              </span>
            </div>

          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-purple-950/50 border border-purple-300/30 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save & Pause
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
