import React from 'react';
import {
  Play,
  Eye,
  Sparkles,
  Clock,
  CheckSquare,
  Square,
  ArrowRight,
  TrendingUp,
  FileText,
  Calendar,
  Zap,
  HelpCircle,
  Flame
} from 'lucide-react';
import {
  Project,
  Task,
  ContextSnapshot,
  WhileAwayUpdate,
  DailyBrief
} from '../../types';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

interface HomeViewProps {
  primaryProject: Project;
  latestSnapshot: ContextSnapshot;
  whileAwayUpdates: WhileAwayUpdate[];
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onResumeWork: () => void;
  onViewContext: (projectId: string) => void;
  onOpenDailyBrief: () => void;
  onWhyAmIDoingThis: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  primaryProject,
  latestSnapshot,
  whileAwayUpdates,
  tasks,
  onTaskToggle,
  onResumeWork,
  onViewContext,
  onOpenDailyBrief,
  onWhyAmIDoingThis
}) => {
  const focusTasks = tasks.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            AI Context Engine Active
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Good morning, Shyma.
          </h1>
          <p className="text-slate-400 text-base mt-1">
            Here's where you left off.
          </p>
        </div>

        {/* Daily Brief Launcher Pill */}
        <button
          onClick={onOpenDailyBrief}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#141624] hover:bg-[#1A1C2E] border border-purple-500/30 rounded-xl shadow-lg shadow-purple-950/20 text-xs font-semibold text-purple-200 transition-all hover:border-purple-500/50 group self-start md:self-auto"
        >
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30 group-hover:scale-110 transition-transform" />
          <span>View Morning Restart Brief</span>
          <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* RESUME CARD — Primary Dashboard Highlight */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#141626] to-[#10111D] border border-purple-500/30 p-7 shadow-2xl shadow-purple-950/40 overflow-hidden group">
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/15 transition-all duration-700" />

        <div className="relative z-10 space-y-6">
          {/* Card Top Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold rounded-lg uppercase tracking-wider">
                {primaryProject.name}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {primaryProject.lastPaused}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ConfidenceBadge score={latestSnapshot.confidence} note="Full working context reconstructed from last night's session." />
              <button
                onClick={onWhyAmIDoingThis}
                className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1 font-medium bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-purple-500/30 transition-colors"
                title="View goal alignment chain"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Why am I doing this?
              </button>
            </div>
          </div>

          {/* Last Context Summary Body */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              LAST CONTEXT SNAPSHOT
            </div>
            <p className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed font-sans">
              "{latestSnapshot.accomplishment} {latestSnapshot.continuationPoint}"
            </p>
          </div>

          {/* Next Recommended Action Banner */}
          <div className="bg-[#191B2E] border border-purple-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-inner">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5 shadow-[0_0_12px_rgba(139,92,246,0.25)]">
                <Zap className="w-5 h-5 fill-purple-300/30" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-2">
                  Next Recommended Action
                  <span className="text-[10px] font-sans font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Est. ~25 min
                  </span>
                </div>
                <div className="text-base font-semibold text-white mt-0.5">
                  {latestSnapshot.nextStep}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onViewContext(primaryProject.id)}
                className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-slate-400" />
                View Context
              </button>

              <button
                onClick={onResumeWork}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-purple-950/60 hover:shadow-purple-600/30 border border-purple-300/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 animate-pulse-subtle group"
              >
                <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                Resume Work
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section: "WHILE YOU WERE AWAY" + "TODAY'S FOCUS" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* WHILE YOU WERE AWAY — AI Digest */}
        <div className="lg:col-span-5 bg-[#121422] border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              While You Were Away
            </h2>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              AI Digest
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Automated context updates detected since your last pause:
          </p>

          <div className="space-y-3 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {whileAwayUpdates.map((update) => (
              <div key={update.id} className="relative flex items-start gap-3 text-xs">
                <span className="w-3 h-3 rounded-full bg-purple-500/20 border border-purple-500/60 shrink-0 mt-0.5 flex items-center justify-center -ml-5 bg-[#121422]">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                </span>
                <div className="flex-1">
                  <div className="text-slate-200 font-medium leading-tight">
                    {update.text}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {update.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TODAY'S FOCUS — 3-5 Important Tasks */}
        <div className="lg:col-span-7 bg-[#121422] border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                Today's Focus
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Only your highest priority items to reduce cognitive overload.
              </p>
            </div>
            <span className="text-xs text-purple-400 font-mono">
              {focusTasks.filter(t => t.status === 'completed').length}/{focusTasks.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {focusTasks.map((task) => {
              const isDone = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  onClick={() => onTaskToggle(task.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isDone
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                      : 'bg-[#17192A] border-slate-800 hover:border-purple-500/40 hover:bg-[#1C1E32]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button className="text-slate-400 hover:text-purple-400 transition-colors shrink-0">
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <div className={`text-sm font-medium truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                        {task.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-purple-400 font-semibold">{task.projectName}</span>
                        <span>•</span>
                        <span>{task.estMinutes} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 pl-3">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                      task.priority === 'high'
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                        : task.priority === 'medium'
                        ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
