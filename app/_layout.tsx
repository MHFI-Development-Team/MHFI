import { Stack } from 'expo-router';

import HeaderLeftIcon from '@/components/HeaderLeftIcon';
import globalStyles from '@/constants/globalStyles';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: '',
          headerLeft: _ => <HeaderLeftIcon />,
          headerStyle: globalStyles.secondary,
        }}
      />
      <Stack.Screen
        name="(dailygoals)"
        options={{
          headerTitle: '',
          headerLeft: _ => <HeaderLeftIcon />,
          headerStyle: globalStyles.secondary,
        }}
      />
    </Stack>
  );
}
