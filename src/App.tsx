import React, { useState } from 'react';
import { NavView, Project, Task, ContextSnapshot, DecisionMemory, TimelineEvent, WhileAwayUpdate } from './types';
import {
  initialProjects,
  initialTasks,
  initialSnapshots,
  initialDecisions,
  initialTimeline,
  initialWhileAwayUpdates,
  initialDailyBrief,
  sihAlignmentChain
} from './data/initialData';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { HomeView } from './components/screens/HomeView';
import { ProjectView } from './components/screens/ProjectView';
import { MemoryView } from './components/screens/MemoryView';
import { TimelineView } from './components/screens/TimelineView';
import { FocusView } from './components/screens/FocusView';

import { PauseWorkModal } from './components/modals/PauseWorkModal';
import { RestartModeModal } from './components/modals/RestartModeModal';
import { AlignmentChainModal } from './components/common/AlignmentChainModal';
import { DailyBriefModal } from './components/common/DailyBriefModal';
import { Toast } from './components/common/Toast';
import { AskRestartWidget } from './components/widgets/AskRestartWidget';

export function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [activeProjectId, setActiveProjectId] = useState<string>('sih-prototype');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Application Data State (Reactive local state)
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [snapshots, setSnapshots] = useState<ContextSnapshot[]>(initialSnapshots);
  const [decisions, setDecisions] = useState<DecisionMemory[]>(initialDecisions);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(initialTimeline);
  const [whileAwayUpdates, setWhileAwayUpdates] = useState<WhileAwayUpdate[]>(initialWhileAwayUpdates);

  // Modals & Overlays State
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [isAlignmentModalOpen, setIsAlignmentModalOpen] = useState(false);
  const [isDailyBriefOpen, setIsDailyBriefOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; subtext?: string }>({
    isVisible: false,
    message: '',
    subtext: ''
  });

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const primaryProject = projects.find((p) => p.isPrimary) || projects[0];
  const latestSnapshot = snapshots.find((s) => s.projectId === activeProjectId) || snapshots[0];

  // Task Checkbox Handler
  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'completed' ? 'todo' : 'completed';
          if (nextStatus === 'completed') {
            setToast({
              isVisible: true,
              message: `Completed: ${t.title}`,
              subtext: 'RE:START automatically recorded this progress in your timeline.'
            });
          }
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // Pause Work Handler
  const handleSavePause = (updatedFields: Partial<ContextSnapshot>) => {
    const timeNow = new Date();
    const timeStr = 'Just now at ' + timeNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update snapshot
    const newSnapshot: ContextSnapshot = {
      ...latestSnapshot,
      ...updatedFields,
      id: `snap-${Date.now()}`,
      timeDisplay: timeStr,
      timestamp: timeNow.toISOString()
    };

    setSnapshots((prev) => [newSnapshot, ...prev]);

    // Add Timeline Event
    const newTimelineEvent: TimelineEvent = {
      id: `tle-${Date.now()}`,
      projectId: activeProject.id,
      projectName: activeProject.name,
      timestamp: timeNow.toISOString(),
      timeStr: timeNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'paused',
      title: 'Context Snapshot Saved & Session Paused',
      description: `AI saved context: "${newSnapshot.nextStep}"`
    };
    setTimeline((prev) => [newTimelineEvent, ...prev]);

    // Update project last paused
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProject.id
          ? { ...p, lastPaused: `Paused ${timeStr}` }
          : p
      )
    );

    // Show Toast
    setToast({
      isVisible: true,
      message: 'Context Saved.',
      subtext: 'Future you will know exactly where to restart.'
    });
  };

  return (
    <div className="flex h-screen bg-[#090A0F] text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={setActiveProjectId}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onNewProject={() => alert("Creating new workspace project... RE:START context tracker initialized.")}
        onPauseWorkClick={() => setIsPauseModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Header */}
        <Header
          currentView={currentView}
          projectName={activeProject.name}
          onPauseWork={() => setIsPauseModalOpen(true)}
          onResumeWork={() => setIsRestartModalOpen(true)}
          onSearchClick={() => setCurrentView('memory')}
        />

        {/* View Router */}
        <main className="flex-1 pb-16">
          {currentView === 'home' && (
            <HomeView
              primaryProject={primaryProject}
              latestSnapshot={latestSnapshot}
              whileAwayUpdates={whileAwayUpdates}
              tasks={tasks}
              onTaskToggle={handleTaskToggle}
              onResumeWork={() => setIsRestartModalOpen(true)}
              onViewContext={(projectId) => {
                setActiveProjectId(projectId);
                setCurrentView('project');
              }}
              onOpenDailyBrief={() => setIsDailyBriefOpen(true)}
              onWhyAmIDoingThis={() => setIsAlignmentModalOpen(true)}
            />
          )}

          {currentView === 'project' && (
            <ProjectView
              project={activeProject}
              alignmentChain={sihAlignmentChain}
              tasks={tasks}
              snapshots={snapshots}
              decisions={decisions}
              timeline={timeline}
              onTaskToggle={handleTaskToggle}
              onPauseWork={() => setIsPauseModalOpen(true)}
              onResumeWork={() => setIsRestartModalOpen(true)}
              onWhyAmIDoingThis={() => setIsAlignmentModalOpen(true)}
            />
          )}

          {currentView === 'memory' && (
            <MemoryView decisions={decisions} snapshots={snapshots} />
          )}

          {currentView === 'timeline' && (
            <TimelineView timeline={timeline} />
          )}

          {currentView === 'focus' && (
            <FocusView
              project={activeProject}
              tasks={tasks}
              onTaskToggle={handleTaskToggle}
              onPauseWork={() => setIsPauseModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      <PauseWorkModal
        isOpen={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
        project={activeProject}
        latestSnapshot={latestSnapshot}
        onSavePause={handleSavePause}
      />

      <RestartModeModal
        isOpen={isRestartModalOpen}
        onClose={() => setIsRestartModalOpen(false)}
        project={activeProject}
        snapshot={latestSnapshot}
        onStartFocusSession={() => {
          setIsRestartModalOpen(false);
          setCurrentView('focus');
        }}
      />

      <AlignmentChainModal
        isOpen={isAlignmentModalOpen}
        onClose={() => setIsAlignmentModalOpen(false)}
        projectName={activeProject.name}
        chain={sihAlignmentChain}
      />

      <DailyBriefModal
        isOpen={isDailyBriefOpen}
        onClose={() => setIsDailyBriefOpen(false)}
        brief={initialDailyBrief}
        onStartRestart={() => setIsRestartModalOpen(true)}
      />

      {/* Toast Notification */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        subtext={toast.subtext}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {/* Floating AI Assistant Widget */}
      <AskRestartWidget
        activeProject={activeProject}
        latestSnapshot={latestSnapshot}
        decisions={decisions}
      />

    </div>
  );
}

export default App;
