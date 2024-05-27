import HeaderLeftIcon from '@/components/HeaderLeftIcon';
import globalStyles from '@/constants/globalStyles';
import { Stack } from 'expo-router';

export default function HabitLayout() {
  return (
    <Stack>
      <Stack.Screen name="HabitDetails/[id]" options={{ title: 'Habit Details' }} />
      <Stack.Screen name="HabitEdit/[id]" options={{ title: 'Edit Habit' }} />
      <Stack.Screen name="AddHabit" options={{ title: 'Add Habit' }} />
    </Stack>
  );
}
