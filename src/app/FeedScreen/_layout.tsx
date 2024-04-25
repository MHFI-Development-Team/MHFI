import { Stack } from "expo-router";

export default function FeedScreenLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
