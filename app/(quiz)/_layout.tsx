import { Stack } from 'expo-router';

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen name="quizScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
