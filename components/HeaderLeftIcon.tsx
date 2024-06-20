import React from 'react';
import { Link } from 'expo-router';
import TabBarIcon from '@/components/Navigation/TabBarIcon';
import { View, TouchableOpacity, Vibration } from 'react-native';


const HeaderLeftIcon: React.FC = () => {
  const handlePress = () => {
    Vibration.vibrate(50);
  };

  return (
    <TouchableOpacity onPress={() => {{Vibration.vibrate(50); {handlePress}}}}>
      <Link href="(tabs)">
        <View>
          <TabBarIcon name="leftcircleo" color="white" />
        </View>
      </Link>
    </TouchableOpacity>
  );
};

export default HeaderLeftIcon;