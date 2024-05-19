import { Stack } from "expo-router";
import TabBarIcon from "@/components/navigation/TabBarIcon";
import { View } from "react-native";
import { Link } from "expo-router";
import HeaderLeftIcon from "@/components/HeaderLeftIcon";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "@/constants/globalStyles";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "",
          headerLeft: _ => <HeaderLeftIcon />,
          headerStyle: globalStyles.secondary
        }}
      />
      <Stack.Screen
        name="(dailygoals)"
        options={{
          headerTitle: "",
          headerLeft: _ => <HeaderLeftIcon />,
          headerStyle: globalStyles.secondary
        }}
      />
    </Stack>
  );
}
