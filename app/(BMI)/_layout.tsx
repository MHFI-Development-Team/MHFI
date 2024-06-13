import HeaderLeftIcon from '@/components/HeaderLeftIcon';
import globalStyles from '@/constants/globalStyles';
import { Stack } from 'expo-router';

export default function bmiLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="bmiScreen"
        options={{
          headerTitle: '',
          headerStyle: globalStyles.secondary,
          headerLeft: () => <HeaderLeftIcon />, 
        }}
      />
      <Stack.Screen
        name="bmiHeight"
        options={{
          headerTitle: '',
          headerStyle: globalStyles.secondary,
          headerLeft: () => <HeaderLeftIcon />, 
        }}
      />
      <Stack.Screen
        name="resultScreen"
        options={{
          headerTitle: '',
          headerStyle: globalStyles.secondary,
          headerLeft: () => <HeaderLeftIcon />,
        }}
      />
    </Stack>
  );
}