import { Tabs } from "expo-router";
import HomeIcon from "../../assets/svg/homeIcon";

export default function RootLayout() {
  const screenOptions = {
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
      backgroundColor: "#303345",
      border: 0,
      color: "transparent",
    },
    tabBarLabelStyle: {
      fontSize: 16,
    },
    headerShown: false,
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="FeedScreen"
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="MessageScreen"
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
