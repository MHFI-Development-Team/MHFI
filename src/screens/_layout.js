import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { globalStyles } from "../assets/style/globalStyle";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  const screenOptions = {
    tabBarActiveTintColor: "blue",
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
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
        }}
      />
    </Tabs>
  );
}
