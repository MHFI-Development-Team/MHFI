import { Stack } from 'expo-router';

export default function DailyLayout() {
  return (
    <Stack>
      <Stack.Screen name="alcoholScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
