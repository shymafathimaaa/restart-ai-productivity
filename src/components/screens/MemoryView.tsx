import React, { useState } from 'react';
import {
  Brain,
  Search,
  Sparkles,
  Bookmark,
  History,
  Lightbulb,
  FileText,
  ArrowRight,
  Filter,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { DecisionMemory, ContextSnapshot } from '../../types';

interface MemoryViewProps {
  decisions: DecisionMemory[];
  snapshots: ContextSnapshot[];
}

export const MemoryView: React.FC<MemoryViewProps> = ({ decisions, snapshots }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'decisions' | 'context' | 'insights' | 'resources'>('all');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setAiAnswer(null);
      return;
    }

    const q = searchQuery.toLowerCase();
    if (q.includes('igot') || q.includes('api') || q.includes('integration')) {
      setAiAnswer(
        "AI Memory Recall: On Sept 7, you decided to use a mock iGOT API integration for the prototype. The rationale was that real API access is unavailable during the current phase and requires government credential approval. The impact is that the frontend can demonstrate the intended integration flow without claiming a live connection."
      );
    } else if (q.includes('stakeholder') || q.includes('metrics') || q.includes('user')) {
      setAiAnswer(
        "AI Memory Recall: Yesterday at 11:42 PM, you completed stakeholder analysis for SIH Prototype, identifying 3 primary user groups. You were planning to convert qualitative findings into three quantified metrics."
      );
    } else if (q.includes('java') || q.includes('array')) {
      setAiAnswer(
        "AI Memory Recall: On Sept 5 in Java Practice, you decided to stick to array-based two-pointer solutions before moving to dynamic programming to master space complexity O(1)."
      );
    } else {
      setAiAnswer(
        `AI Memory Synthesis for "${searchQuery}": Found 2 related decisions and 1 context snapshot in SIH Prototype memory. All entries confirm high alignment with project goals.`
      );
    }
  };

  const sampleQueries = [
    "What did I decide about the iGOT integration?",
    "Where did I stop on stakeholder analysis?",
    "What was my last decision on Java algorithms?",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <Brain className="w-4 h-4 text-purple-400" />
          Personal Context Memory Vault
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Your Work Memory
        </h1>
        <p className="text-slate-400 text-sm">
          Everything important your future self might need.
        </p>
      </div>

      {/* AI Natural Language Search Bar */}
      <div className="relative">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!e.target.value) setAiAnswer(null);
            }}
            placeholder="Search your work memory... (e.g. 'What did I decide about the iGOT integration?')"
            className="w-full pl-12 pr-28 py-4 bg-[#121422] border border-purple-500/30 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-2xl transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-2.5 bottom-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-purple-950/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Query AI
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Try asking:</span>
          {sampleQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(query);
                if (query.includes('iGOT')) {
                  setAiAnswer(
                    "AI Memory Recall: On Sept 7, you decided to use a mock iGOT API integration for the prototype. Rationale: Real API access isn't available. Impact: Frontend demonstrates integration flow smoothly."
                  );
                } else {
                  setAiAnswer(`AI Memory Recall for "${query}": Retrieved 3 context nodes from SIH Prototype history.`);
                }
              }}
              className="px-3 py-1 bg-slate-900/80 hover:bg-purple-950/40 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/30 rounded-lg text-xs transition-colors"
            >
              "{query}"
            </button>
          ))}
        </div>
      </div>

      {/* AI Synthesized Answer Box */}
      {aiAnswer && (
        <div className="bg-gradient-to-r from-purple-950/60 via-[#141628] to-indigo-950/60 border border-purple-500/40 rounded-2xl p-6 shadow-2xl space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-400" />
            AI Memory Synthesizer Response
          </div>
          <p className="text-sm font-medium text-slate-100 leading-relaxed font-sans">
            {aiAnswer}
          </p>
          <div className="text-[11px] text-purple-300/70 font-mono pt-2 border-t border-purple-500/20 flex items-center justify-between">
            <span>Citation: Decision Memory #dec-1 • SIH Prototype</span>
            <span className="text-emerald-400">Match Confidence: 98%</span>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'all', label: 'All Memories', icon: Brain },
          { id: 'decisions', label: 'Decisions', icon: Bookmark },
          { id: 'context', label: 'Context Sessions', icon: History },
          { id: 'insights', label: 'AI Insights', icon: Lightbulb },
          { id: 'resources', label: 'Resources & Files', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* DECISIONS SECTION */}
      {(activeCategory === 'all' || activeCategory === 'decisions') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-purple-400" />
              Preserved Decision Memory
            </h2>
            <span className="text-xs text-slate-400 font-mono">{decisions.length} Decisions Saved</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decisions.map((dec) => (
              <div key={dec.id} className="bg-[#121422] border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded font-mono font-semibold">
                    {dec.projectName}
                  </span>
                  <span className="font-mono text-slate-400">{dec.date}</span>
                </div>

                <h3 className="text-sm font-bold text-white">Decision: {dec.decision}</h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-400 font-mono">Why:</strong> {dec.why}
                </p>

                <p className="text-xs text-purple-300/90 pt-2 border-t border-slate-800/80">
                  <strong className="text-slate-400 font-mono">Impact:</strong> {dec.impact}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {dec.tags.map((t, idx) => (
                    <span key={idx} className="text-[9px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTEXT SESSIONS SECTION */}
      {(activeCategory === 'all' || activeCategory === 'context') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-blue-400" />
              Work Session Context Snapshots
            </h2>
            <span className="text-xs text-slate-400 font-mono">{snapshots.length} Snapshots Saved</span>
          </div>

          <div className="space-y-3">
            {snapshots.map((snap) => (
              <div key={snap.id} className="p-5 bg-[#121422] border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="font-semibold text-purple-300">{snap.projectName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">{snap.timeDisplay}</span>
                  </div>
                  <div className="text-sm font-medium text-white font-sans">
                    "{snap.accomplishment}"
                  </div>
                  <div className="text-xs text-slate-400">
                    Next Action: <strong className="text-slate-200">{snap.nextStep}</strong>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Context snapshot from ${snap.timeDisplay} loaded.`)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors shrink-0"
                >
                  Inspect Context
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INSIGHTS SECTION */}
      {(activeCategory === 'all' || activeCategory === 'insights') && (
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            AI Discovered Productivity Patterns
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#121422] border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-amber-400 font-semibold uppercase">Velocity Peak</div>
              <div className="text-sm font-bold text-white">Evening Focus Alignment (9 PM – 11:30 PM)</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your highest completion rate occurs in 45-minute focused bursts late at night when stopping with clear next-action markers.
              </p>
            </div>

            <div className="p-5 bg-[#121422] border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-semibold uppercase">Cognitive Friction</div>
              <div className="text-sm font-bold text-white">Context Decay Prevention</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Saving context snapshots reduced your morning start lag from 18 minutes to under 2 minutes.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
