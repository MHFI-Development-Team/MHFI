import { Stack } from 'expo-router';

export default function DailyLayout() {
  return (
    <Stack>
      <Stack.Screen name="smokingScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
