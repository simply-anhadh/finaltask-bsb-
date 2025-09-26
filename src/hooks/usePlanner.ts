import { useState } from 'react';
import { Goal, Roadmap, PlannerState } from '../types';
import { generateRoadmapWithAI } from '../services/openai';

// Mock AI response - in production, this would call your OpenAI API
const generateMockRoadmap = (goal: Goal): Promise<Roadmap> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const weeks: Record<string, any> = {};
      const milestones = [];
      
      for (let i = 1; i <= goal.timeframe; i++) {
        const weekKey = `Week ${i}`;
        milestones.push(`Milestone ${i}: Progress checkpoint for ${goal.text}`);
        
        weeks[weekKey] = {
          tasks: [
            `Complete core task ${i} for ${goal.text}`,
            `Review progress and adjust strategy`,
            `Practice new skills learned this week`,
            `Document learnings and insights`
          ],
          resources: [
            `https://example.com/resource-week-${i}`,
            `https://example.com/tutorial-${i}`,
            `https://example.com/documentation-${i}`
          ],
          reflection: `Week ${i} reflection: Focus on building momentum towards ${goal.text}. What worked well? What needs adjustment?`,
          mentorTip: getMentorTip(goal.mentorStyle, i)
        };
      }
      
      resolve({ milestones, weeks });
    }, 2000);
  });
};

const getMentorTip = (style: string, week: number): string => {
  const tips = {
    coach: [
      "Push through the resistance! Champions are made in moments like these.",
      "No excuses, just execution. You've got this!",
      "The grind doesn't stop. Stay disciplined, stay hungry.",
      "Progress over perfection. Keep moving forward!"
    ],
    zen: [
      "Be present with your progress. Each step is part of the journey.",
      "Breathe deeply and trust the process. Growth happens naturally.",
      "Find balance between effort and ease. You are exactly where you need to be.",
      "Embrace the challenges as teachers. They guide you to wisdom."
    ],
    techbro: [
      "Time to scale up! You're crushing it - let's 10x this momentum!",
      "Data-driven decisions FTW! Optimize everything, disrupt yourself!",
      "You're not just building a goal, you're building the future!",
      "Ship fast, learn faster! Your growth trajectory is exponential!"
    ]
  };
  
  return tips[style as keyof typeof tips][week % 4] || "Keep pushing forward!";
};

export const usePlanner = () => {
  const [state, setState] = useState<PlannerState>({
    currentGoal: null,
    roadmap: null,
    completedWeeks: new Set(),
    currentWeek: null,
    isLoading: false
  });

  const generatePlan = async (goal: Goal) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Try to use real AI first, fallback to mock if API key is missing
      let roadmap: Roadmap;
      try {
        roadmap = await generateRoadmapWithAI(goal);
      } catch (error) {
        console.warn('AI generation failed, using mock data:', (error as Error).message);
        roadmap = await generateMockRoadmap(goal);
      }
      
      setState(prev => ({
        ...prev,
        currentGoal: goal,
        roadmap,
        currentWeek: 'Week 1',
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to generate plan:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const toggleWeekCompletion = (week: string) => {
    setState(prev => {
      const newCompleted = new Set(prev.completedWeeks);
      if (newCompleted.has(week)) {
        newCompleted.delete(week);
      } else {
        newCompleted.add(week);
      }
      return { ...prev, completedWeeks: newCompleted };
    });
  };

  const setCurrentWeek = (week: string) => {
    setState(prev => ({ ...prev, currentWeek: week }));
  };

  const getXP = () => {
    if (!state.roadmap) return 0;
    const totalWeeks = Object.keys(state.roadmap.weeks).length;
    const completedCount = state.completedWeeks.size;
    return Math.round((completedCount / totalWeeks) * 100) * 10;
  };

  return {
    ...state,
    generatePlan,
    toggleWeekCompletion,
    setCurrentWeek,
    getXP
  };
};