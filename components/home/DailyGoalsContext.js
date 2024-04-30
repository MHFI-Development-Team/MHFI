import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// NOTE: expo-secure-store only works for mobile (https://docs.expo.dev/versions/latest/sdk/securestore/)
const DailyGoalsContext = createContext();

export const DailyGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const addGoal = async goal => {
    setGoals([...goals, goal]);
    await SecureStore.setItemAsync('goals', JSON.stringify([...goals, goal]));
  };

  useEffect(() => {
    async function fetchGoals() {
      if (goals.length != 0)
        return goals;

      // NOTE: uncomment the below if you would like
      // to remove all of the goals (for testing purposes)..
      // await SecureStore.deleteItemAsync('goals')

      let goalJson = await SecureStore.getItemAsync('goals') || '[]'
      let items = JSON.parse(goalJson);

      setGoals(items);
    }

    fetchGoals();
  }, [])
  return (
    <DailyGoalsContext.Provider value={{ goals, addGoal }}>
      {children}
    </DailyGoalsContext.Provider>
  );
};

export default DailyGoalsContext;