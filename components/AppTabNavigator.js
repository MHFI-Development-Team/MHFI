import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './stacks/HomeStackScreen';
import FeedScreen from './screens/FeedScreen';
import MessageScreen from './screens/MessageScreen';

const Tab = createBottomTabNavigator();

export const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: { backgroundColor: '#171621', borderTopWidth: 0, elevation: 0, paddingTop: 10 },
      tabBarActiveTintColor: "red",
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case "HomeTab": return <HomeIcon focused={focused} />;
          case "Feed": return <FeedIcon focused={focused} />;
          case "Messages": return <MessagesIcon focused={focused} />;
          default: return null;
        }
      },
    })}
  >
    {/* <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ headerShown: false }} /> */}
    <Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Messages" component={MessageScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);
