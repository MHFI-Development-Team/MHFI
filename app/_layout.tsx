import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, scheduleNotifications } from '@/utils/notifications';
import HeaderLeftIcon from '@/components/HeaderLeftIcon';
import FeedHeaderLeftIcon from '@/components/feedHeaderLeftIcon';
import globalStyles from '@/constants/globalStyles';
import { ProfileProvider, useProfile } from '@/contexts/ProfileContext';
import { ArticleProvider } from '@/components/ArticleContext';

const NotificationSetup = () => {
  const router = useRouter();
  const { name } = useProfile();

  useEffect(() => {
    const delay = 3000; // Delay in milliseconds (e.g., 3000ms = 3 seconds)

    const setupNotifications = async () => {
      await registerForPushNotificationsAsync();
      console.log('Scheduling notifications with name:', name);
      await scheduleNotifications(name);
    };

    const timeoutId = setTimeout(setupNotifications, delay);

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      const screen = response.notification.request.content.data.screen;
      if (screen) {
        router.push(screen);
      }
    });

    return () => {
      clearTimeout(timeoutId);
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [name]);

  return null;
};

export default function RootLayout() {
  return (
    <ProfileProvider>
      <ArticleProvider>
        <NotificationSetup />
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
            name="(geolocator)"
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
      </ArticleProvider>
    </ProfileProvider>
  );
}