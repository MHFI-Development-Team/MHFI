import { View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useResponsive } from "react-native-responsive-hook";
import { global_style_function } from "./assets/style";
import React, { useCallback, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MessageScreen from "./components/screens/MessageScreen";
import DailyGoalsTasksScreen from "./components/screens/DailyGoalTaskScreen";
import HomeScreen from "./components/screens/HomeScreen";
import FeedScreen from "./components/screens/FeedScreen";
import * as SplashScreen from "expo-splash-screen";

import SmokingCalculatorUI from "./components/screens/smoking-calculator/SmokingCalculatorUI";
import AlchololCalculatorUI from "./components/screens/alcohol-calculator/AlchololCalculatorUI";
import BMIWeightScreen from "./components/screens/bmi-calculator/components/BMIWeightScreen";
import BMIHeightScreen from "./components/screens/bmi-calculator/components/BMIHeightSceen";
import BMIResultScreen from "./components/screens/bmi-calculator/components/BMIResultScreen";
import QuizUI from "./components/screens/quiz-screen/QuizUI";
import QuizResult from "./components/screens/quiz-screen/QuizResult";
import SignPostScreen from "./components/screens/SignPostScreen";
import GeoLocatorScreen from "./components/screens/GeoLocatorScreen";
import GoalManagementScreen from "./components/screens/GoalManagementScreen";

import HomeIcon from "./assets/svg/home-icon";
import FeedIcon from "./assets/svg/feed-icon";
import MessagesIcon from "./assets/svg/messages-icon";
import SettingIcon from "./assets/svg/SettingsIcon";
import * as Font from "expo-font";
import ProfileIcon from "./assets/svg/ProfileIcon";
import BackIcon from "./assets/svg/backIcon";
import { colours } from "./assets/theme";
import { DailyGoalsProvider } from "./components/home/DailyGoalsContext";

import {HomeStackScreen} from './components/home/HomeStackScreen'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const screenWidth = Dimensions.get("window").width;

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const styles = useStyles();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
          "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
          "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
    
    return (
    
    <SafeAreaView style={styles.flow} onLayout={onLayoutRootView}>
      <DailyGoalsProvider>
        <NavigationContainer style={styles.flow}>
          <HomeStackScreen />
        </NavigationContainer>
      </DailyGoalsProvider>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { rem, vh, vw } = useResponsive();

  const styles = StyleSheet.create({
    ...global_style_function,
    flow: {
      flex: 1,
      backgroundColor: "#303345",
    },
    background: {
      backgroundColor: colours.background,
    },
  });

  return styles;
};
