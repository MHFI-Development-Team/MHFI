import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Function to register for push notifications
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
      alert('EAS project ID is not defined!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync({
      projectId: projectId,
    })).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Function to cancel all notifications
export async function cancelAllNotifications() {
  console.log('Cancelling all notifications');
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Function to schedule notifications
export async function scheduleNotifications(username: string) {
  await cancelAllNotifications(); // Cancel all existing notifications

  console.log('Scheduling notifications for username:', username);

  // Daily notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Hi ${username}!`,
      body: "Check in to track your emotion today.",
      data: { screen: 'profile' },
    },
    trigger: { seconds: 60, repeats: true },
  });

  // Bi-daily notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: "Read a new article today.",
      data: { screen: 'feed' },
    },
    trigger: { seconds: 2 * 24 * 60 * 60, repeats: true },
  });

  // Monthly notification - Alcohol intake
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Health Check",
      body: "Track your alcohol intake.",
      data: { screen: '(alcohol)' },
    },
    trigger: { seconds: 30 * 24 * 60 * 60, repeats: true },
  });

  // Monthly notification - Smoking
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Financial Health",
      body: "See how much you would save if you stopped smoking today.",
      data: { screen: '(smoking)' },
    },
    trigger: { seconds: 30 * 24 * 60 * 60, repeats: true },
  });
}