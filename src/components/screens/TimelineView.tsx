import React from 'react';
import { Clock, Play, CheckCircle2, Bookmark, PauseCircle, Sparkles, Filter } from 'lucide-react';
import { TimelineEvent } from '../../types';

interface TimelineViewProps {
  timeline: TimelineEvent[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ timeline }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <Clock className="w-4 h-4 text-purple-400" />
          Context Reconstruction Stream
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Productivity Memory Timeline
        </h1>
        <p className="text-slate-400 text-sm">
          A visual record of what actually happened during your work sessions.
        </p>
      </div>

      {/* Visual Connecting Timeline */}
      <div className="bg-[#121422] border border-slate-800 rounded-2xl p-6 md:p-8 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
            Yesterday's Session Memory (Sept 8)
          </div>
          <span className="text-xs text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 font-mono">
            Duration: 1h 42m
          </span>
        </div>

        {/* Connected Vertical Nodes */}
        <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-indigo-500 to-emerald-500">
          
          {timeline.map((event) => {
            let icon = <Play className="w-3.5 h-3.5 text-purple-300 fill-purple-300/30" />;
            let badgeBg = 'bg-purple-500/20 border-purple-500/50';

            if (event.type === 'milestone') {
              icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
              badgeBg = 'bg-emerald-500/20 border-emerald-500/50';
            } else if (event.type === 'decision') {
              icon = <Bookmark className="w-3.5 h-3.5 text-indigo-400" />;
              badgeBg = 'bg-indigo-500/20 border-indigo-500/50';
            } else if (event.type === 'paused') {
              icon = <PauseCircle className="w-3.5 h-3.5 text-amber-400" />;
              badgeBg = 'bg-amber-500/20 border-amber-500/50';
            }

            return (
              <div key={event.id} className="relative group">
                {/* Node circle */}
                <div className={`absolute -left-11 top-0.5 w-7 h-7 rounded-full bg-[#121422] border ${badgeBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {event.timeStr}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {event.projectName}
                    </span>
                  </div>

                  <div className="p-4 bg-[#17192B] rounded-xl border border-slate-800/80 group-hover:border-purple-500/40 transition-all space-y-1">
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      {event.title}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};
