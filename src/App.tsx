import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoalForm } from './components/GoalForm';
import { RoadmapView } from './components/RoadmapView';
import { usePlanner } from './hooks/usePlanner';

function App() {
  const {
    currentGoal,
    roadmap,
    completedWeeks,
    currentWeek,
    isLoading,
    generatePlan,
    toggleWeekCompletion,
    setCurrentWeek,
    getXP
  } = usePlanner();

  const handleBack = () => {
    // Reset to initial state
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!roadmap ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <GoalForm onSubmit={generatePlan} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <RoadmapView
                roadmap={roadmap}
                completedWeeks={completedWeeks}
                currentWeek={currentWeek}
                xp={getXP()}
                onWeekClick={setCurrentWeek}
                onToggleComplete={toggleWeekCompletion}
                onBack={handleBack}
                goalText={currentGoal?.text || ''}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;