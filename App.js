import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/screens/HomeScreen';
import FeedScreen from './components/screens/FeedScreen';
import HomeIcon from './assets/svg/home-icon';
import FeedIcon from './assets/svg/feed-icon';
import MessagesIcon from './assets/svg/messages-icon';
import { useResponsive } from "react-native-responsive-hook";
import { global_style_function } from './assets/style';
import SettingIcon from './assets/svg/SettingsIcon';

const Tab = createBottomTabNavigator();

function CustomHeader() {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.background}>
      <View style={{
        height: 60,
        backgroundColor: styles.background.backgroundColor, // Ensuring the background color is consistent
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
      }}>
        <TouchableOpacity onPress={() => console.log('Left Icon Pressed')}>
          <SettingIcon />
        </TouchableOpacity>
        <Text style={styles.TextStyle}>Header Title</Text>
        <TouchableOpacity onPress={() => console.log('Right Icon Pressed')}>
          <SettingIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.flow}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: styles.background.backgroundColor,
              left: 0,
              bottom: 0,
              borderTopWidth: 0,
              elevation: 0,
              paddingTop: 10,
            },
            tabBarActiveTintColor: "#fff",
            tabBarIcon: ({ focused }) => {
              if (route.name === "Home") {
                return <HomeIcon focused={focused} />;
              } else if (route.name === "Feed") {
                return <FeedIcon focused={focused} />;
              } else if (route.name === "Messages") {
                return <MessagesIcon focused={focused} />;
              }
            },
            tabBarLabelStyle: {
              fontFamily: "Poppins",
              fontSize: 12,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ header: () => <CustomHeader />, headerShown: true }} />
          <Tab.Screen name="Feed" component={FeedScreen} options={{ header: () => <CustomHeader />, headerShown: true }} />
          <Tab.Screen name="Messages" component={HomeScreen} options={{ header: () => <CustomHeader />, headerShown: true }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { rem, vh, vw } = useResponsive();

  const styles = StyleSheet.create({
    ...global_style_function,
    flow: {
      flex: 1,
      backgroundColor: "#040509"
    },
    background: {
      backgroundColor: "#040509"
    },
    TextStyle:{
      color: 'white',
      fontWeight: '700',
      fontFamily: "Poppins",
      fontSize: 16,
    }
  });

  return styles;
};
