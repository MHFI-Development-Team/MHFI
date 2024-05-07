import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

import { useNavigation } from "@react-navigation/native";
import DailyGoalsTasksScreen from "../screens/DailyGoalTaskScreen";

import { Layout } from "../_layout";
const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="DailyGoalsTasks"
        component={DailyGoalsTasksScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
