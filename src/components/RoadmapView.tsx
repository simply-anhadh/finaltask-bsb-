import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleCheck as CheckCircle, Clock, Trophy, Zap, Download, Target } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Roadmap } from '../types';
import { WeekPanel } from './WeekPanel';
import { exportToPDF } from '../utils/pdfExport';

interface RoadmapViewProps {
  roadmap: Roadmap;
  completedWeeks: Set<string>;
  currentWeek: string | null;
  xp: number;
  onWeekClick: (week: string) => void;
  onToggleComplete: (week: string) => void;
  onBack: () => void;
  goalText: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  completedWeeks,
  currentWeek,
  xp,
  onWeekClick,
  onToggleComplete,
  onBack,
  goalText
}) => {
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const weeks = Object.keys(roadmap.weeks);

  const getWeekStatus = (week: string, index: number) => {
    if (completedWeeks.has(week)) return 'completed';
    if (week === currentWeek) return 'current';
    return 'upcoming';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'current': return '🧠';
      case 'upcoming': return '🕒';
      default: return '🕒';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 border-green-400 text-white shadow-green-200';
      case 'current': return 'bg-blue-500 border-blue-400 text-white shadow-blue-200 animate-pulse';
      case 'upcoming': return 'bg-gray-300 border-gray-200 text-gray-600 shadow-gray-100';
      default: return 'bg-gray-300 border-gray-200 text-gray-600 shadow-gray-100';
    }
  };

  const handleDownloadPDF = () => {
    exportToPDF(roadmap, goalText, completedWeeks);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back to form
        </button>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-800">XP: {xp}</span>
          </div>
          
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Goal Display */}
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Your Goal</h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{goalText}</p>
      </motion.div>

      {/* Milestones */}
      <motion.div 
        className="mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Key Milestones</h3>
        <div className="grid gap-2">
          {roadmap.milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur rounded-lg"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
              <span className="text-gray-700">{milestone}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vertical Roadmap */}
      <div className="relative">
        <div className="flex flex-col items-center space-y-8">
          {weeks.map((week, index) => {
            const status = getWeekStatus(week, index);

            return (
              <motion.div
                key={week}
                className="flex items-center justify-center w-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="relative">
                  <motion.button
                    onClick={() => {
                      onWeekClick(week);
                      setSelectedWeek(week);
                    }}
                    className={`
                      w-24 h-24 rounded-full border-4 shadow-lg transition-all duration-300
                      flex flex-col items-center justify-center text-sm font-semibold
                      hover:scale-110 cursor-pointer
                      ${getStatusColor(status)}
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl mb-1">{getStatusIcon(status)}</span>
                    <span className="text-xs">{week}</span>
                  </motion.button>

                  {/* Connection line to next week */}
                  {index < weeks.length - 1 && (
                    <div 
                      className="absolute top-full left-1/2 w-1 h-24 bg-gray-300"
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Final Trophy */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * weeks.length }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-yellow-300 shadow-2xl flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Week Details Dialog */}
      <Dialog.Root open={!!selectedWeek} onOpenChange={(open) => !open && setSelectedWeek(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
            {/* Required for accessibility */}
            <Dialog.Title className="sr-only">
              {selectedWeek ? `${selectedWeek} Details` : 'Week Details'}
            </Dialog.Title>

            <AnimatePresence>
              {selectedWeek && (
                <WeekPanel
                  week={selectedWeek}
                  data={roadmap.weeks[selectedWeek]}
                  isCompleted={completedWeeks.has(selectedWeek)}
                  onToggleComplete={() => onToggleComplete(selectedWeek)}
                  onClose={() => setSelectedWeek(null)}
                />
              )}
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
};
