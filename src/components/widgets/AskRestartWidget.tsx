import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, ArrowRight } from 'lucide-react';
import { Project, ContextSnapshot, DecisionMemory } from '../../types';

interface AskRestartWidgetProps {
  activeProject: Project;
  latestSnapshot: ContextSnapshot;
  decisions: DecisionMemory[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AskRestartWidget: React.FC<AskRestartWidgetProps> = ({
  activeProject,
  latestSnapshot,
  decisions
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello Shyma! I remember your working context for ${activeProject.name}. Ask me where you left off or why a decision was made.`,
      timestamp: 'Just now'
    }
  ]);

  const presetPrompts = [
    "Where did I stop yesterday?",
    "What was my last decision?",
    "What should I work on next?",
    "Show me stakeholder analysis details"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent simulated context answer
    setTimeout(() => {
      let responseText = "";
      const q = query.toLowerCase();

      if (q.includes('stop') || q.includes('yesterday') || q.includes('where')) {
        responseText = `Yesterday at 11:42 PM, you finished stakeholder analysis for SIH Prototype. You were about to convert findings into three quantified metrics.`;
      } else if (q.includes('decision') || q.includes('decide')) {
        const lastDec = decisions[0];
        responseText = `Your last logged decision on ${lastDec.date} was: "${lastDec.decision}". Reasoning: ${lastDec.why}`;
      } else if (q.includes('next') || q.includes('work on') || q.includes('should')) {
        responseText = `Your best next step is: "${latestSnapshot.nextStep}" (Est. ~25 min).`;
      } else if (q.includes('stakeholder')) {
        responseText = `Stakeholder Analysis Summary: Identified 3 primary user groups. Files linked: Presentation_Draft.pdf and Stakeholder_Map.png.`;
      } else {
        responseText = `Based on your context memory for ${activeProject.name}: You are in ${activeProject.phase} (Progress: ${activeProject.progress}%). Your next action is ${latestSnapshot.nextStep}.`;
      }

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-full shadow-2xl shadow-purple-950/80 border border-purple-300/40 transition-all transform hover:scale-105 group"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs">Ask RE:START</span>
        </button>
      ) : (
        <div className="bg-[#121422] border border-purple-500/30 rounded-2xl w-80 sm:w-96 h-[480px] shadow-2xl shadow-purple-950/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Drawer Header */}
          <div className="p-4 bg-[#17192B] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  Ask RE:START
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-purple-300">
                  {activeProject.name} Memory Active
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preset Prompts bar */}
          <div className="px-3 py-2 bg-[#0E0F1A] border-b border-slate-800/60 overflow-x-auto flex items-center gap-1.5 text-[11px] whitespace-nowrap">
            {presetPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 bg-slate-900 hover:bg-purple-950/50 text-slate-300 hover:text-purple-300 rounded-lg border border-slate-800 hover:border-purple-500/30 transition-colors shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none font-medium'
                      : 'bg-[#181A2D] text-slate-200 border border-slate-800 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#17192B] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your work..."
              className="flex-1 bg-[#10111E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
