import React, { Children } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import ProfileIcon from '../assets/svg/ProfileIcon';
import BackIcon from '../assets/svg/backIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/screens/HomeScreen';
import FeedScreen from '../components/screens/FeedScreen';
import MessageScreen from '../components/screens/MessageScreen';
import HomeIcon from '../assets/svg/home-icon';
import FeedIcon from '../assets/svg/feed-icon';
import MessagesIcon from '../assets/svg/messages-icon';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get("window").width;
const Tab = createBottomTabNavigator();

const AppTabNavigator = () => (
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
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Messages" component={MessageScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export const Layout = ({ headerType }) => {
  return (
    <>
      <Header type={headerType} />
      <AppTabNavigator />
    </>
  );
};

const Header = ({ type }) => {
  const navigation = useNavigation();
  return (
    <View style={headerStyles}>
      {type === 'back' ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <ProfileIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const headerStyles = {
  height: 60,
  backgroundColor: "#171621",
  alignItems: "flex-end",
  justifyContent: "flex-start",
  flexDirection: "row",
  paddingHorizontal: screenWidth * 0.05,
};