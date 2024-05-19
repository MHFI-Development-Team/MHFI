import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon, TabBarIconName } from '@/components/navigation/TabBarIcon';

const tabs = [
  { name: 'index', title: 'Home', icon: 'home' },
  { name: 'feedScreen', title: 'Feed', icon: 'filetext1' },
  { name: 'messageScreen', title: 'Message', icon: 'message1' }
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF922E',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: 'bold'
        },
        tabBarStyle: {
          backgroundColor: '#303345',
          borderTopColor: 'transparent',
          elevation: 0
        }
      }}>
      {tabs.map((tab, i) => (
        <Tabs.Screen
          key={i}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={tab.icon as TabBarIconName} color={focused ? color : color} />
            ),
          }}></Tabs.Screen>
      ))}
    </Tabs>
  );
}
