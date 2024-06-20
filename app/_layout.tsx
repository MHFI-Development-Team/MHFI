import React, { useContext, useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import HeaderLeftIcon from '@/components/HeaderLeftIcon';
import FeedHeaderLeftIcon from '@/components/feedHeaderLeftIcon';
import globalStyles from '@/constants/globalStyles';
import { ProfileProvider } from '@/components/ProfileContext';
import { Image, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { Article } from '@/constants/types';
import { ArticleContext, ArticleContextType, ArticleProvider } from '@/components/AcrticleContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [appIsReady, setAppIsReady] = useState(false);

  // if (!appIsReady) {
  //   return null;
  // }

  return (
    <>
      <ArticleProvider>
        <ProfileProvider>
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
        </ProfileProvider>
      </ArticleProvider>
    </>
  );
}
