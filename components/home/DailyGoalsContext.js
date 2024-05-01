import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const DailyGoalsContext = createContext();

export const DailyGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const addGoal = async (goal) => {
    const updatedGoals = [...goals, goal];
    await SecureStore.setItemAsync('goals', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const editGoal = async (index, updatedGoal) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = updatedGoal;
    setGoals(updatedGoals);

    await SecureStore.setItemAsync('goals', JSON.stringify(goals));
  };

  const deleteGoal = async index => {
    const updatedGoals = goals.filter((_, i) => i != index)
    setGoals(updatedGoals);

    await SecureStore.setItemAsync('goals', JSON.stringify(goals));
  };


  useEffect(() => {
    const fetchGoals = async () => {
      // NOTE: To remove all of the goals, kindly uncomment the line below.
      // await SecureStore.deleteItemAsync('goals');

      const goalJson = await SecureStore.getItemAsync('goals') || '[]';
      const items = JSON.parse(goalJson);

      if (items.length > 0) {
        setGoals(items);
      }
    };

    fetchGoals();
  }, []);

  return (
    <DailyGoalsContext.Provider value={{ goals, addGoal, editGoal, deleteGoal }}>
      {children}
    </DailyGoalsContext.Provider>
  );
};

export default DailyGoalsContext;