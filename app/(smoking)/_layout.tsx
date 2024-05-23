import { Stack } from 'expo-router';

export default function SmokingLayout() {
  return (
    <Stack>
      <Stack.Screen name="smokingScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
