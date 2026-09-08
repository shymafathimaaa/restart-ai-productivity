import React from 'react';
import {
  Home,
  FolderGit2,
  Clock,
  Brain,
  Zap,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { NavView, Project } from '../../types';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNewProject: () => void;
  onPauseWorkClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  projects,
  activeProjectId,
  onSelectProject,
  isCollapsed,
  onToggleCollapse,
  onNewProject,
  onPauseWorkClick
}) => {
  const mainNavItems = [
    { id: 'home' as NavView, label: 'Home', icon: Home },
    { id: 'project' as NavView, label: 'Projects', icon: FolderGit2 },
    { id: 'timeline' as NavView, label: 'Timeline', icon: Clock },
    { id: 'memory' as NavView, label: 'Memory', icon: Brain },
    { id: 'focus' as NavView, label: 'Focus Sessions', icon: Zap },
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen bg-[#0E0F17] border-r border-slate-800/80 transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/60">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5">
            {/* Minimal circular arrow combined with spark */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-950/50 border border-purple-400/30 group">
              <RefreshCw className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-700" />
              <Sparkles className="w-2.5 h-2.5 text-purple-200 absolute -top-1 -right-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-white tracking-tight flex items-center">
                RE<span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] font-black text-xl mx-0.5">:</span>START
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wide uppercase -mt-1">
                Context Memory
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto relative w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md border border-purple-400/30">
            <RefreshCw className="w-4 h-4 text-white" />
            <Sparkles className="w-2.5 h-2.5 text-purple-200 absolute -top-1 -right-1" />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors hidden md:flex"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Action: Pause Work */}
      <div className="p-3">
        <button
          onClick={onPauseWorkClick}
          className={`w-full bg-gradient-to-r from-purple-600/90 to-indigo-600/90 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-purple-950/40 border border-purple-400/30 transition-all flex items-center justify-center gap-2 group ${
            isCollapsed ? 'py-2.5 px-0' : 'py-2.5 px-3'
          }`}
          title="Pause Work & Snapshot Context"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          {!isCollapsed && <span className="text-xs font-semibold tracking-wide">Pause Work</span>}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold px-2 mb-1">
          {!isCollapsed && 'Workspace'}
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              title={item.label}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              {!isCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {!isCollapsed && isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
              )}
            </button>
          );
        })}

        {/* Projects List */}
        <div className="pt-5 pb-1">
          <div className="flex items-center justify-between px-2 mb-2">
            {!isCollapsed && (
              <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                Projects
              </span>
            )}
            <button
              onClick={onNewProject}
              className="text-slate-400 hover:text-purple-300 p-1 rounded-md hover:bg-slate-800 transition-colors"
              title="New Project"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {projects.map((proj) => {
              const isProjActive = currentView === 'project' && activeProjectId === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj.id);
                    onNavigate('project');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isProjActive
                      ? 'bg-slate-800/90 text-white border border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                  title={proj.name}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: proj.color || '#8B5CF6' }}
                  />
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{proj.name}</span>
                  )}
                  {!isCollapsed && proj.isPrimary && (
                    <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded font-mono">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer Profile & Settings */}
      <div className="p-3 border-t border-slate-800/80 bg-[#0B0C12] space-y-1">
        <button
          onClick={() => alert("RE:START Preferences — Workspace Context Retention set to 100%.")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4 text-slate-400 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-inner">
            S
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-200 truncate">Shyma</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Memory synced
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
