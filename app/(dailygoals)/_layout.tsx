import { Stack } from 'expo-router';

export default function DailyLayout() {
  return (
    <Stack>
      <Stack.Screen name="dailyGoalsTasks" options={{ headerShown: false }} />
      <Stack.Screen name="dailyGoalsEdit" options={{ headerShown: false }} />
    </Stack>
  );
}
