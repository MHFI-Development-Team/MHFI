import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/screens/HomeScreen';
import FeedScreen from './components/screens/FeedScreen';
import HomeIcon from './assets/svg/home-icon';
import FeedIcon from './assets/svg/feed-icon';
import MessagesIcon from './assets/svg/messages-icon';
import { useResponsive } from "react-native-responsive-hook";
import { global_style_function } from './assets/style';
import SettingIcon from './assets/svg/SettingsIcon';
import React, { useCallback, useEffect, useState } from 'react';
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import ProfileIcon from './assets/svg/ProfileIcon';
import { LinearGradient } from 'expo-linear-gradient';
import SettingsScreen from './components/screens/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  const styles = useStyles();

  useEffect(() => {
    async function prepare() {
      try {
        
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'Poppins': require("./assets/fonts/Poppins-Regular.ttf"),
          'Poppins-Bold': require("./assets/fonts/Poppins-Bold.ttf"),
          'Poppins-SemiBold': require("./assets/fonts/Poppins-SemiBold.ttf"),
          'Poppins-Medium': require("./assets/fonts/Poppins-Medium.ttf")
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
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.flow} onLayout={onLayoutRootView}>
      <NavigationContainer style={styles.flow} >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: "transparent",
              left: 0,
              bottom: 0,
              borderTopWidth: 0,
              elevation: 0,
              paddingTop: 10,
            },
            tabBarActiveTintColor: "#fff",
            tabBarIcon: ({ focused }) => {
              if (route.name === "Home") {
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
            headerShown: false
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="Feed" component={FeedScreen}/>
          <Tab.Screen name="Messages" component={HomeScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { rem, vh, vw } = useResponsive();

  const styles = StyleSheet.create({
    ...global_style_function,
    flow: {
      flex: 1,
      backgroundColor: "blue"
    },
    background: {
      backgroundColor: "#040509"
    }
  });

  return styles;
};
