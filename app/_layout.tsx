import { Stack } from 'expo-router';
import HeaderLeftIcon from '@/components/HeaderLeftIcon';
import globalStyles from '@/constants/globalStyles';
import FeedHeaderLeftIcon from '@/components/feedHeaderLeftIcon';

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
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: '',
          headerLeft: _ => <FeedHeaderLeftIcon />,
          headerStyle: globalStyles.secondary,
        }}
      />
      <Stack.Screen
        name="(alcohol)"
        options={{
          headerTitle: '',
          headerLeft: _ => <HeaderLeftIcon />,
          headerStyle: globalStyles.secondary,
        }}
      />
      <Stack.Screen
        name="(smoking)"
        options={{
          headerTitle: '',
          headerLeft: _ => <HeaderLeftIcon />,
          headerStyle: globalStyles.secondary,
        }}
      />
      <Stack.Screen name="(quiz)" options={{ headerShown: false }} />
      <Stack.Screen name="(BMI)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(sign)"
        options={{
          headerTitle: '',
          headerLeft: _ => <HeaderLeftIcon />,
          headerStyle: globalStyles.secondary,
        }}
      />
    </Stack>
  );
}
