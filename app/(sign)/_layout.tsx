import { Stack } from 'expo-router';

export default function SmokingLayout() {
  return (
    <Stack>
      <Stack.Screen name="signPosting" options={{ headerShown: false }} />
    </Stack>
  );
}
