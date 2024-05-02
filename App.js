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

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const screenWidth = Dimensions.get("window").width;

const HeaderComponent = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#171621",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: screenWidth * 0.05,
      }}
    >
      <TouchableOpacity>
        <ProfileIcon />
      </TouchableOpacity>
    </View>
  );
};

const HeaderComponentBack = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#171621",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: screenWidth * 0.05,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon />
      </TouchableOpacity>
    </View>
  );
};

function HomeStackScreen() {
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => <HeaderComponent navigation={navigation} />,
        }}
      />
      <HomeStack.Screen
        name="DailyGoalTasks"
        component={DailyGoalsTasksScreen}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
      <HomeStack.Screen
        name="BMIWeight"
        component={BMIWeightScreen}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
       <HomeStack.Screen
        name="BMIHeight"
        component={BMIHeightScreen}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
           <HomeStack.Screen
        name="BMIResult"
        component={BMIResultScreen}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
      <HomeStack.Screen
        name="SmokeCalc"
        component={SmokingCalculatorUI}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
      <HomeStack.Screen
        name="AlchoholCalculatorScreen"
        component={AlchololCalculatorUI}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
      <HomeStack.Screen
        name="Geo"
        component={GeoLocatorScreen}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
      <HomeStack.Screen
        name="Quiz"
        component={QuizUI}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
      <HomeStack.Screen
        name="SignPost"
        component={SignPostScreen}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
      <HomeStack.Screen
        name="GoalManagement"
        component={GoalManagementScreen}
        options={{
          headerShown: true,
          header: () => <HeaderComponentBack navigation={navigation} />,
        }}
      />
    </HomeStack.Navigator>
  );
}

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
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle: {
                backgroundColor: colours.background,
                borderTopWidth: 0,
                elevation: 0,
                paddingTop: 10,
              },
              tabBarActiveTintColor: "red",
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => {
                if (route.name === "HomeTab") {
                  return <HomeIcon focused={focused} />;
                } else if (route.name === "Feed") {
                  return <FeedIcon focused={focused} />;
                } else if (route.name === "Messages") {
                  return <MessagesIcon focused={focused} />;
                }
              },
              tabBarLabelStyle: {
                fontFamily: "Poppins",
                fontSize: 12,
              },
              headerShown: false,
            })}
          >
            <Tab.Screen
              name="HomeTab"
              component={HomeStackScreen}
              options={{
                headerShown: false,
                header: () => <HeaderComponent />,
              }}
            />
            <Tab.Screen
              name="Feed"
              component={FeedScreen}
              options={{ headerShown: true, header: () => <HeaderComponent /> }}
            />
            <Tab.Screen
              name="Messages"
              component={MessageScreen}
              options={{ headerShown: true, header: () => <HeaderComponent /> }}
            />
            {/* <Tab.Screen
            name="ProfileTab"
            component={ProfileStackScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
          />
          <Tab.Screen
            name="SettingsTab"
            component={SettingsStackScreen}
            options={{ headerShown: false, tabBarButton: () => null  }}
          /> */}
          </Tab.Navigator>
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
