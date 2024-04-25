import { Stack } from "expo-router";

export default function HomeScreenLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
