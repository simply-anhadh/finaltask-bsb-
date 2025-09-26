export interface Goal {
  text: string;
  timeframe: number;
  mentorStyle: 'coach' | 'zen' | 'techbro';
}

export interface WeekData {
  tasks: string[];
  resources: string[];
  reflection: string;
  mentorTip: string;
}

export interface Roadmap {
  milestones: string[];
  weeks: Record<string, WeekData>;
}

export interface PlannerState {
  currentGoal: Goal | null;
  roadmap: Roadmap | null;
  completedWeeks: Set<string>;
  currentWeek: string | null;
  isLoading: boolean;
}