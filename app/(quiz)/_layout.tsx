import HeaderLeftIcon from '@/components/HeaderLeftIcon';
import globalStyles from '@/constants/globalStyles';
import { Stack } from 'expo-router';
import QuizHeader from '@/components/quizHeaderLeft';

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="quizScreen"
        options={{
          headerTitle: '',
          headerLeft: _ => <HeaderLeftIcon />,
          headerStyle: globalStyles.secondary,
        }}
      />
      <Stack.Screen
        name="[quiz]"
        options={{
          headerTitle: '',
          headerLeft: _ => <QuizHeader />,
          headerStyle: globalStyles.secondary,
        }}
      />
    </Stack>
  );
}
