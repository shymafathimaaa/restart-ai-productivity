import React from 'react';
import { Search, PauseCircle, Play, Bell, Sparkles } from 'lucide-react';
import { NavView } from '../../types';

interface HeaderProps {
  currentView: NavView;
  projectName?: string;
  onPauseWork: () => void;
  onResumeWork: () => void;
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  projectName,
  onPauseWork,
  onResumeWork,
  onSearchClick
}) => {
  const getTitle = () => {
    switch (currentView) {
      case 'home':
        return 'Command Center';
      case 'project':
        return projectName ? `Project / ${projectName}` : 'Project Workspace';
      case 'timeline':
        return 'Productivity Memory Trail';
      case 'memory':
        return 'Your Work Memory';
      case 'focus':
        return 'Focus Workspace';
      default:
        return 'RE:START';
    }
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#090A0F]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold text-slate-100 flex items-center gap-2">
          {getTitle()}
        </h1>
        <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" />
          Context Active
        </span>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Search Bar Trigger */}
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-xl text-xs transition-all shadow-inner"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search memory...</span>
          <kbd className="font-mono text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Resume Button */}
        <button
          onClick={onResumeWork}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 font-medium rounded-xl border border-purple-500/30 text-xs transition-all"
        >
          <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
          Resume Mode
        </button>

        {/* Pause Button */}
        <button
          onClick={onPauseWork}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-md shadow-purple-950/40 text-xs border border-purple-400/30 transition-all group"
        >
          <PauseCircle className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          Pause Work
        </button>
      </div>
    </header>
  );
};
