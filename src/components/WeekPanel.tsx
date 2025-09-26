import React from 'react';
import { motion } from 'framer-motion';
import { X, CircleCheck as CheckCircle, Circle, ExternalLink, Lightbulb, MessageCircle } from 'lucide-react';
import { WeekData } from '../types';

interface WeekPanelProps {
  week: string;
  data: WeekData;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onClose: () => void;
}

export const WeekPanel: React.FC<WeekPanelProps> = ({
  week,
  data,
  isCompleted,
  onToggleComplete,
  onClose
}) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 20 }}
      className="h-full bg-white"
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{week}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Completion Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-medium text-gray-800">Mark as Complete</span>
          <button
            onClick={onToggleComplete}
            className="flex items-center gap-2"
          >
            {isCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </div>

        {/* Tasks */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Tasks
          </h3>
          <div className="space-y-3">
            {data.tasks.map((task, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{task}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <ExternalLink className="w-5 h-5 text-purple-600" />
            Resources
          </h3>
          <div className="space-y-2">
            {data.resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ExternalLink className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 hover:underline">{resource}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Reflection */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Reflection
          </h3>
          <motion.div
            className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-700 italic">{data.reflection}</p>
          </motion.div>
        </div>

        {/* Mentor Tip */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <MessageCircle className="w-5 h-5 text-green-600" />
            Mentor Tip
          </h3>
          <motion.div
            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-green-800 font-medium">{data.mentorTip}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};