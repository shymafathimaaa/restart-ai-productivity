import React, { useState } from 'react';
import {
  Folder,
  CheckCircle2,
  Clock,
  HelpCircle,
  Plus,
  Sparkles,
  FileText,
  Bookmark,
  Share2,
  ListTodo,
  Layers,
  Brain,
  History,
  Target,
  Flag,
  Calendar,
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import {
  Project,
  Task,
  ContextSnapshot,
  DecisionMemory,
  TimelineEvent,
  AlignmentChain
} from '../../types';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

interface ProjectViewProps {
  project: Project;
  alignmentChain: AlignmentChain;
  tasks: Task[];
  snapshots: ContextSnapshot[];
  decisions: DecisionMemory[];
  timeline: TimelineEvent[];
  onTaskToggle: (taskId: string) => void;
  onPauseWork: () => void;
  onResumeWork: () => void;
  onWhyAmIDoingThis: () => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
  project,
  alignmentChain,
  tasks,
  snapshots,
  decisions,
  timeline,
  onTaskToggle,
  onPauseWork,
  onResumeWork,
  onWhyAmIDoingThis
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'context' | 'decisions'>('overview');

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectDecisions = decisions.filter((d) => d.projectId === project.id);
  const projectSnapshots = snapshots.filter((s) => s.projectId === project.id);
  const projectTimeline = timeline.filter((tl) => tl.projectId === project.id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Project Header Banner */}
      <div className="bg-[#121422] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 bottom-0 w-1.5"
          style={{ backgroundColor: project.color || '#8B5CF6' }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20 uppercase tracking-wider">
                {project.category}
              </span>
              <ConfidenceBadge score={project.contextConfidence} note={project.confidenceNote} />
            </div>

            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              {project.name}
            </h1>

            <p className="text-sm text-slate-300 max-w-2xl">
              Objective: <strong className="text-slate-100 font-medium">"{project.objective}"</strong>
            </p>
          </div>

          {/* Progress & CTAs */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="text-right">
                <div className="text-2xl font-black text-white font-mono">{project.progress}%</div>
                <div className="text-[10px] text-slate-400 font-mono uppercase">Completion</div>
              </div>
              <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onWhyAmIDoingThis}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-semibold rounded-xl border border-purple-500/30 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4 text-purple-400" />
                Why am I doing this?
              </button>

              <button
                onClick={onResumeWork}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-950/40 border border-purple-300/30 transition-all flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                Restart Mode
              </button>
            </div>
          </div>
        </div>

        {/* Project Meta Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2.5">
            <Target className="w-4 h-4 text-purple-400" />
            <div>
              <span className="text-slate-400 font-mono">Current Phase:</span>{' '}
              <strong className="text-slate-200">{project.phase}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Flag className="w-4 h-4 text-blue-400" />
            <div>
              <span className="text-slate-400 font-mono">Next Milestone:</span>{' '}
              <strong className="text-slate-200">{project.nextMilestone} ({project.nextMilestoneDate})</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-slate-400 font-mono">Last Session:</span>{' '}
              <strong className="text-slate-200">{project.lastPaused}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'overview', label: 'Overview & Memory Trail', icon: Layers },
          { id: 'tasks', label: `Tasks (${projectTasks.length})`, icon: ListTodo },
          { id: 'context', label: `Context Snapshots (${projectSnapshots.length})`, icon: Brain },
          { id: 'decisions', label: `Decision Memory (${projectDecisions.length})`, icon: Bookmark },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* CONTEXT THREAD / MEMORY TRAIL (Chronological Stream) */}
          <div className="lg:col-span-7 bg-[#121422] border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-purple-400" />
                  Context Memory Trail
                </h2>
                <p className="text-xs text-slate-400">
                  Chronological stream of work context and cognitive state snapshots.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded">
                Live Memory
              </span>
            </div>

            <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-500/60 before:via-blue-500/40 before:to-slate-800">
              {projectTimeline.map((item) => (
                <div key={item.id} className="relative space-y-1 group">
                  {/* Circle Indicator Node */}
                  <span className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#121422] border-2 border-purple-500 flex items-center justify-center text-[10px] text-purple-300 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                  </span>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-purple-300">{item.timeStr}</span>
                    <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#17192A] rounded-xl border border-slate-800/80 group-hover:border-purple-500/30 transition-all">
                    <div className="text-sm font-semibold text-slate-100">{item.title}</div>
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: DECISION MEMORY HIGHLIGHTS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Decision Memory Box */}
            <div className="bg-[#121422] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-indigo-400" />
                  Decision Memory
                </h3>
                <span className="text-[10px] font-mono text-slate-400">AI preserved</span>
              </div>

              <div className="space-y-3">
                {projectDecisions.map((dec) => (
                  <div key={dec.id} className="p-4 bg-[#17192B] rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-purple-300 font-semibold">{dec.date}</span>
                      <div className="flex gap-1">
                        {dec.tags.map((t, idx) => (
                          <span key={idx} className="text-[9px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-white">
                      Decision: {dec.decision}
                    </div>
                    <div className="text-xs text-slate-300">
                      <strong className="text-slate-400 font-mono">Why:</strong> {dec.why}
                    </div>
                    <div className="text-xs text-purple-300/90 pt-1 border-t border-slate-800">
                      <strong className="text-slate-400 font-mono">Impact:</strong> {dec.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Context Summary Box */}
            <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border border-purple-500/30 rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono uppercase text-purple-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                RE:START Context Snapshot
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "You finished the stakeholder analysis and identified the three primary user groups. You were about to convert qualitative findings into three quantified metrics."
              </p>
              <button
                onClick={onPauseWork}
                className="w-full py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl text-xs font-semibold transition-colors mt-2"
              >
                Update Context Snapshot
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT: TASKS */}
      {activeTab === 'tasks' && (
        <div className="bg-[#121422] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Project Tasks</h2>
            <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              Add Task
            </button>
          </div>

          <div className="space-y-2">
            {projectTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => onTaskToggle(t.id)}
                className="flex items-center justify-between p-4 bg-[#17192B] rounded-xl border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.status === 'completed'}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-purple-600 bg-slate-800 border-slate-700"
                  />
                  <span className={`text-sm font-medium ${t.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                    {t.title}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>~{t.estMinutes} min</span>
                  <span className="uppercase text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {t.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CONTEXT SNAPSHOTS */}
      {activeTab === 'context' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Context Snapshots History</h2>
            <span className="text-xs text-slate-400 font-mono">Restorable Context Memory</span>
          </div>

          <div className="space-y-4">
            {projectSnapshots.map((snap) => (
              <div key={snap.id} className="bg-[#121422] border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-400">{snap.timeDisplay}</span>
                    <ConfidenceBadge score={snap.confidence} size="sm" />
                  </div>
                  <button
                    onClick={() => alert(`Restoring context snapshot from ${snap.timeDisplay}...`)}
                    className="text-xs text-purple-300 hover:text-white font-mono bg-purple-500/20 hover:bg-purple-500/30 px-3 py-1 rounded-lg border border-purple-500/30 transition-colors"
                  >
                    Restore Context →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="text-slate-400 font-mono uppercase text-[10px] mb-1">Accomplished</div>
                    <div className="text-slate-200">{snap.accomplishment}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-mono uppercase text-[10px] mb-1">Thinking</div>
                    <div className="text-slate-200">"{snap.thought}"</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-mono uppercase text-[10px] mb-1 font-bold">Next Action</div>
                    <div className="text-white font-semibold">{snap.nextStep}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: DECISION MEMORY */}
      {activeTab === 'decisions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Project Decision Log</h2>
            <span className="text-xs text-slate-400 font-mono">Preserved Reasoning & Impact</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectDecisions.map((dec) => (
              <div key={dec.id} className="bg-[#121422] border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-purple-400 font-bold">{dec.date}</span>
                  <div className="flex gap-1">
                    {dec.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white">{dec.decision}</h3>
                
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400 font-mono">Reasoning:</strong> {dec.why}
                </p>

                <p className="text-xs text-purple-300/90 pt-2 border-t border-slate-800">
                  <strong className="text-slate-400 font-mono">Impact:</strong> {dec.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
