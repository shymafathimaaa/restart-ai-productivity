import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string;
  subtext?: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  subtext,
  isVisible,
  onClose,
  duration = 4000
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#181A2A] border border-purple-500/40 text-slate-100 p-4 rounded-xl shadow-2xl shadow-purple-950/60 max-w-md flex items-start gap-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500" />
        <div className="p-1.5 bg-purple-500/20 text-purple-300 rounded-lg shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <div className="font-semibold text-sm text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {message}
          </div>
          {subtext && (
            <div className="text-xs text-purple-300/80 mt-0.5 leading-relaxed font-sans">
              "{subtext}"
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
