import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, CheckSquare, Square, Sparkles, PauseCircle } from 'lucide-react';
import { Task, Project } from '../../types';

interface FocusViewProps {
  project: Project;
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onPauseWork: () => void;
}

export const FocusView: React.FC<FocusViewProps> = ({
  project,
  tasks,
  onTaskToggle,
  onPauseWork
}) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [notes, setNotes] = useState(
    "Working on converting stakeholder qualitative feedback into 3 quantified metrics: 1) Efficiency boost %, 2) Resource access latency, 3) User satisfaction index."
  );

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-purple-400 fill-purple-400/20" />
            Distraction-Free Focus Space
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Focus Mode: {project.name}
          </h1>
        </div>

        <button
          onClick={onPauseWork}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-950/40 border border-purple-400/30 flex items-center gap-1.5"
        >
          <PauseCircle className="w-4 h-4" />
          Pause Session
        </button>
      </div>

      {/* Main Focus Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Timer Box */}
        <div className="lg:col-span-6 bg-[#121422] border border-purple-500/30 rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 shadow-2xl shadow-purple-950/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
          
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
            Pomodoro Focus Timer
          </div>

          <div className="font-mono text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            {timeFormatted}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="w-14 h-14 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-xl shadow-purple-950/60 transition-transform active:scale-95"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(25 * 60);
              }}
              className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            {isRunning ? 'Session Active — Context auto-syncing' : 'Paused — Ready when you are'}
          </div>
        </div>

        {/* Focus Tasks & Scratchpad */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Active Checklist */}
          <div className="bg-[#121422] border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center justify-between">
              <span>Session Target Checklist</span>
              <span className="text-purple-400">{projectTasks.filter(t => t.status === 'completed').length}/{projectTasks.length}</span>
            </div>

            <div className="space-y-2">
              {projectTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onTaskToggle(task.id)}
                  className="flex items-center gap-3 p-2.5 bg-[#17192A] rounded-xl border border-slate-800 hover:border-purple-500/30 cursor-pointer text-xs"
                >
                  {task.status === 'completed' ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className={task.status === 'completed' ? 'line-through text-slate-500' : 'text-white font-medium'}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Scratchpad */}
          <div className="bg-[#121422] border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-xs font-mono uppercase text-purple-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Live Context Scratchpad (Auto-Saved)
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Jot down active thoughts here... RE:START will preserve this when you pause."
              className="w-full bg-[#17192A] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 font-mono"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
