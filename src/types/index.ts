export type NavView = 'home' | 'project' | 'timeline' | 'memory' | 'focus';

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  estMinutes: number;
  priority: Priority;
  status: 'todo' | 'in_progress' | 'completed';
  completedAt?: string;
}

export interface ContextSnapshot {
  id: string;
  projectId: string;
  projectName: string;
  timestamp: string;
  timeDisplay: string;
  accomplishment: string;
  thought: string;
  continuationPoint: string;
  nextStep: string;
  files: Array<{ name: string; type: string; size?: string }>;
  confidence: number; // 0 - 100
}

export interface DecisionMemory {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  decision: string;
  why: string;
  impact: string;
  tags: string[];
}

export interface TimelineEvent {
  id: string;
  projectId: string;
  projectName: string;
  timestamp: string;
  timeStr: string;
  type: 'started' | 'note' | 'decision' | 'milestone' | 'paused';
  title: string;
  description: string;
  fileRef?: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  progress: number;
  objective: string;
  phase: string;
  nextMilestone: string;
  nextMilestoneDate: string;
  lastPaused: string;
  statusText: string;
  contextConfidence: number; // e.g. 94
  confidenceNote: string;
  color: string;
  isPrimary?: boolean;
  tasksCount: number;
}

export interface AlignmentChain {
  goal: string;
  milestone: string;
  currentTask: string;
  nextAction: string;
}

export interface WhileAwayUpdate {
  id: string;
  text: string;
  type: 'completed' | 'deadline' | 'notes' | 'task';
  timestamp: string;
}

export interface DailyBrief {
  date: string;
  timeWorked: string;
  completedList: string[];
  stoppedTask: string;
  recommendedNextStep: string;
  estMinutes: number;
}

export interface MemorySearchResult {
  query: string;
  answer: string;
  confidence: number;
  matchedItems: Array<{
    id: string;
    type: 'decision' | 'snapshot' | 'note';
    title: string;
    snippet: string;
    date: string;
  }>;
}
