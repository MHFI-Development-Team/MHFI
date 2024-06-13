import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import HeaderLeftIcon from '@/components/HeaderLeftIcon';
import FeedHeaderLeftIcon from '@/components/feedHeaderLeftIcon';
import globalStyles from '@/constants/globalStyles';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
       
        await new Promise(resolve => setTimeout(resolve, 5000)); 
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!appIsReady) {
    return null; 
  }

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
