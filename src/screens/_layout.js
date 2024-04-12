import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { globalStyles } from "../assets/style/globalStyle";
import { Image } from "react-native";
import HomeIcon from "../assets/svg/homeIcon";
import FeedIcon from "../assets/svg/feedIcon";
import Feed from "./feed";
import MessageIcon from "../assets/svg/messageIcon";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  const screenOptions = {
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
      backgroundColor: "#040509",
    },
    tabBarLabelStyle: {
      fontFamily: "Poppins",
      fontSize: 12,
    },
    headerShown: false,

  };

  return (
    <Tabs
      screenOptions={screenOptions}
      sceneContainerStyle={globalStyles.layoutContainer}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <HomeIcon />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: () => (
            <FeedIcon />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: () => (
           <MessageIcon />
          ),
          
        }}
      />
    </Tabs>
  );
}
