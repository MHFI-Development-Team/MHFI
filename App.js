<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './App/Screens/LoginScreen/LoginScreen';



export default function App() {


  return (

    <View>
     <LoginScreen/>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});
=======
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useResponsive } from "react-native-responsive-hook";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/views/HomeScreen";
import HomeIcon from "./assets/svg/home-icon";
import FeedIcon from "./assets/svg/feed-icon";
import MessagesIcon from "./assets/svg/messages-icon";

const Tab = createBottomTabNavigator();

import { global_style_function } from "./assets/style";

export default function App() {
  const styles = useStyles();

  return (
    <SafeAreaView style={{ ...styles.flow, ...styles.background }}>
      <NavigationContainer style={{ ...styles.background }} >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: "#000",
            },
            
            tabBarActiveTintColor: "#fff",
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Home") {
                return <HomeIcon focused={focused} />;
              } else if (route.name === "Feed") {
                return <FeedIcon focused={focused} />;
              } else if (route.name === "Messages") {
                return <MessagesIcon focused={focused} />;
              }
            },
          })}
        >
          <Tab.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
          <Tab.Screen name="Feed" component={HomeScreen} />
          <Tab.Screen name="Messages" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { rem, vh, vw } = useResponsive();

  const styles = StyleSheet.create({
    ...global_style_function(),
    flow: {
      flex: 1,
    }
  });

  return styles;
};
>>>>>>> 8096190a151087fc0b6ce2b6a5eaf15682024f40
