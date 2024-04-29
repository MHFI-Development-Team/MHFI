import React, { createContext, useState } from 'react';

const DailyGoalsContext = createContext();

export const DailyGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const addGoal = goal => {
    setGoals([...goals, goal]);
  };

  return (
    <DailyGoalsContext.Provider value={{ goals, addGoal }}>
      {children}
    </DailyGoalsContext.Provider>
  );
};

export default DailyGoalsContext;