import {
  Project,
  Task,
  ContextSnapshot,
  DecisionMemory,
  TimelineEvent,
  WhileAwayUpdate,
  DailyBrief,
  AlignmentChain
} from '../types';

export const initialProjects: Project[] = [
  {
    id: 'sih-prototype',
    name: 'SIH Prototype',
    category: 'Hackathon Project',
    progress: 68,
    objective: 'Finalize prototype presentation & functional interactive demo.',
    phase: 'Prototype Development',
    nextMilestone: 'Presentation Review',
    nextMilestoneDate: 'Sept 12',
    lastPaused: 'Paused yesterday at 11:42 PM',
    statusText: 'Active • High Velocity',
    contextConfidence: 94,
    confidenceNote: 'Your last session ended with a clear next action and linked files.',
    color: '#8B5CF6',
    isPrimary: true,
    tasksCount: 6
  },
  {
    id: 'java-practice',
    name: 'Java Practice',
    category: 'Skill Building',
    progress: 45,
    objective: 'Master array manipulations & two-pointer technique.',
    phase: 'Data Structures',
    nextMilestone: 'LeetCode Medium Benchmark',
    nextMilestoneDate: 'Sept 15',
    lastPaused: 'Paused 2 days ago at 4:15 PM',
    statusText: 'In Progress',
    contextConfidence: 78,
    confidenceNote: 'Stopped mid-problem with test harness setup.',
    color: '#3B82F6',
    tasksCount: 4
  },
  {
    id: 'personal-website',
    name: 'Personal Website',
    category: 'Design & Dev',
    progress: 82,
    objective: 'Refactor hero layout & optimize Lighthouse performance.',
    phase: 'Polish & Launch',
    nextMilestone: 'Domain Deployment',
    nextMilestoneDate: 'Sept 20',
    lastPaused: 'Paused 4 days ago',
    statusText: 'Queued',
    contextConfidence: 88,
    confidenceNote: 'Clean stopping state with responsive breakpoints left to test.',
    color: '#10B981',
    tasksCount: 3
  },
  {
    id: 'semester-project',
    name: 'Semester Project',
    category: 'Academic',
    progress: 30,
    objective: 'Complete ER diagram & schema normalization for DBMS submission.',
    phase: 'Database Design',
    nextMilestone: 'Schema Submission',
    nextMilestoneDate: 'Sept 22',
    lastPaused: 'Paused 5 days ago',
    statusText: 'On Hold',
    contextConfidence: 61,
    confidenceNote: 'Session ended without a defined next step.',
    color: '#F59E0B',
    tasksCount: 5
  }
];

export const initialTasks: Task[] = [
  {
    id: 't-1',
    title: 'Create quantified metrics section',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    estMinutes: 25,
    priority: 'high',
    status: 'todo'
  },
  {
    id: 't-2',
    title: 'Complete Java array problems',
    projectId: 'java-practice',
    projectName: 'Java Practice',
    estMinutes: 40,
    priority: 'high',
    status: 'todo'
  },
  {
    id: 't-3',
    title: 'Review presentation slides',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    estMinutes: 20,
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 't-4',
    title: 'Mock API integration test flow',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    estMinutes: 30,
    priority: 'high',
    status: 'todo'
  },
  {
    id: 't-5',
    title: 'Verify mobile viewport styles',
    projectId: 'personal-website',
    projectName: 'Personal Website',
    estMinutes: 15,
    priority: 'low',
    status: 'todo'
  }
];

export const initialSnapshots: ContextSnapshot[] = [
  {
    id: 'snap-sep8',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    timestamp: '2026-09-08T23:42:00Z',
    timeDisplay: 'Sept 8 — 11:42 PM',
    accomplishment: 'You finished the stakeholder analysis and identified the three primary user groups.',
    thought: 'Need to make sure qualitative findings translate directly into three measurable, impact-driven metrics for the judges.',
    continuationPoint: 'You were about to convert qualitative findings into three quantified metrics.',
    nextStep: 'Create the quantified metrics section.',
    files: [
      { name: 'Presentation_Draft.pdf', type: 'document', size: '2.4 MB' },
      { name: 'Research_Notes.md', type: 'text', size: '14 KB' },
      { name: 'Stakeholder_Map.png', type: 'image', size: '850 KB' }
    ],
    confidence: 94
  },
  {
    id: 'snap-sep7',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    timestamp: '2026-09-07T22:15:00Z',
    timeDisplay: 'Sept 7 — 10:15 PM',
    accomplishment: 'Defined three target user groups and mapped workflow friction points.',
    thought: 'Need realistic mock data for iGOT integration to prove scalability.',
    continuationPoint: 'Ready to build visual stakeholder diagram.',
    nextStep: 'Complete Stakeholder Mapping chart.',
    files: [
      { name: 'User_Personas.key', type: 'presentation', size: '5.1 MB' }
    ],
    confidence: 90
  },
  {
    id: 'snap-sep6',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    timestamp: '2026-09-06T21:32:00Z',
    timeDisplay: 'Sept 6 — 9:32 PM',
    accomplishment: 'Changed prototype direction to prioritize instant context recall over generic task list.',
    thought: 'The core problem is context fragmentation across sessions.',
    continuationPoint: 'Drafting initial UI layout spec.',
    nextStep: 'Sketch dashboard layout and command center UI.',
    files: [
      { name: 'Architecture_Spec.vsdx', type: 'diagram', size: '1.2 MB' }
    ],
    confidence: 86
  }
];

export const initialDecisions: DecisionMemory[] = [
  {
    id: 'dec-1',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    date: 'Sept 7',
    decision: 'Use a mock iGOT API integration for the prototype.',
    why: 'Real API access isn\'t available during the current phase and requires government credential approval.',
    impact: 'Frontend can demonstrate the intended integration flow smoothly without claiming an unverified live backend connection.',
    tags: ['Architecture', 'API', 'Hackathon']
  },
  {
    id: 'dec-2',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    date: 'Sept 6',
    decision: 'Prioritize dark theme Linear-inspired UI over standard dashboard layout.',
    why: 'Decreases visual clutter, reduces cognitive strain for late-night productivity, and looks premium.',
    impact: 'Higher user retention during evening work sessions and instant visual distinction.',
    tags: ['UI/UX', 'Branding']
  },
  {
    id: 'dec-3',
    projectId: 'java-practice',
    projectName: 'Java Practice',
    date: 'Sept 5',
    decision: 'Stick to array-based two-pointer solutions before moving to dynamic programming.',
    why: 'Establishes pattern recognition and optimal space complexity habits first.',
    impact: 'Cleaner solutions with O(1) space complexity on problem submissions.',
    tags: ['Learning', 'Algorithms']
  }
];

export const initialTimeline: TimelineEvent[] = [
  {
    id: 'tle-6',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    timestamp: '2026-09-08T23:42:00Z',
    timeStr: '11:42 PM',
    type: 'paused',
    title: 'Paused session',
    description: 'AI snapshot saved: "Finished stakeholder analysis. Next step: Quantified metrics slide."'
  },
  {
    id: 'tle-5',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    timestamp: '2026-09-08T22:58:00Z',
    timeStr: '10:58 PM',
    type: 'note',
    title: 'Added context note',
    description: '"Need to make sure the metrics are measurable and aligned with jury evaluation criteria."'
  },
  {
    id: 'tle-4',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    timestamp: '2026-09-08T22:23:00Z',
    timeStr: '10:23 PM',
    type: 'milestone',
    title: 'Completed milestone',
    description: 'Completed Stakeholder Map diagram & identified 3 primary user groups.'
  },
  {
    id: 'tle-3',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    timestamp: '2026-09-08T21:15:00Z',
    timeStr: '9:15 PM',
    type: 'started',
    title: 'Started focus session',
    description: 'Focused session launched for SIH Prototype (Duration: 1h 42m).'
  },
  {
    id: 'tle-2',
    projectId: 'sih-prototype',
    projectName: 'SIH Prototype',
    timestamp: '2026-09-07T22:15:00Z',
    timeStr: 'Sept 7 - 10:15 PM',
    type: 'decision',
    title: 'Architectural Decision Logged',
    description: 'Approved mock iGOT API fallback strategy.'
  }
];

export const initialWhileAwayUpdates: WhileAwayUpdate[] = [
  {
    id: 'wa-1',
    text: 'You completed Stakeholder Mapping',
    type: 'completed',
    timestamp: 'Yesterday 10:23 PM'
  },
  {
    id: 'wa-2',
    text: 'Your project deadline is now 3 days closer (Sept 12)',
    type: 'deadline',
    timestamp: 'Today 12:00 AM'
  },
  {
    id: 'wa-3',
    text: '2 related research notes were attached to SIH Prototype',
    type: 'notes',
    timestamp: 'Yesterday 11:10 PM'
  },
  {
    id: 'wa-4',
    text: 'Your next recommended task was automatically synthesized',
    type: 'task',
    timestamp: 'Yesterday 11:42 PM'
  }
];

export const initialDailyBrief: DailyBrief = {
  date: 'Today',
  timeWorked: '1h 42m',
  completedList: ['Stakeholder analysis', 'User segmentation mapping'],
  stoppedTask: 'Quantified metrics section',
  recommendedNextStep: 'Create the three quantified metrics.',
  estMinutes: 25
};

export const sihAlignmentChain: AlignmentChain = {
  goal: 'Build winning hackathon prototype for SIH 2026',
  milestone: 'Complete functional interactive demo & presentation review',
  currentTask: 'Finalize prototype presentation metrics',
  nextAction: 'Create quantified metrics slide'
};
