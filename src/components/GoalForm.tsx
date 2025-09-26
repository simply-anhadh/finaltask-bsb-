import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Brain, Sparkles } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { Goal } from '../types';

interface GoalFormProps {
  onSubmit: (goal: Goal) => void;
  isLoading: boolean;
}

const mentorStyles = [
  { value: 'coach', label: 'Coach (tough-love)', icon: '💪', description: 'Direct, motivating, no-nonsense approach' },
  { value: 'zen', label: 'Zen Monk (calm)', icon: '🧘', description: 'Peaceful, mindful, balanced guidance' },
  { value: 'techbro', label: 'Tech Bro (hype)', icon: '🚀', description: 'Energetic, ambitious, growth-focused' }
];

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, isLoading }) => {
  const [goal, setGoal] = useState('');
  const [timeframe, setTimeframe] = useState(4);
  const [mentorStyle, setMentorStyle] = useState<Goal['mentorStyle']>('coach');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit({ text: goal.trim(), timeframe, mentorStyle });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h1 
          className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Agentic AI Planner 🌱
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Turn big goals into an actionable, adaptive weekly plan — powered by AI 🚀
        </motion.p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Target className="w-4 h-4 text-purple-600" />
              What's your goal?
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Learn React and build 3 projects, Start a fitness routine, Master Spanish..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Clock className="w-4 h-4 text-blue-600" />
              Timeframe (weeks)
            </label>
            <input
              type="number"
              value={timeframe}
              onChange={(e) => setTimeframe(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="52"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Brain className="w-4 h-4 text-emerald-600" />
              Choose your AI mentor style
            </label>
            <Select.Root value={mentorStyle} onValueChange={(value) => setMentorStyle(value as Goal['mentorStyle'])}>
              <Select.Trigger className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors bg-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {mentorStyles.find(s => s.value === mentorStyle)?.icon}
                  <Select.Value />
                </span>
                <Select.Icon />
              </Select.Trigger>
              
              <Select.Portal>
                <Select.Content className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <Select.Viewport>
                    {mentorStyles.map((style) => (
                      <Select.Item
                        key={style.value}
                        value={style.value}
                        className="px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-start gap-3 focus:outline-none focus:bg-gray-50"
                      >
                        <span className="text-xl">{style.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{style.label}</div>
                          <div className="text-sm text-gray-500">{style.description}</div>
                        </div>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                Generating your plan...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Plan
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};