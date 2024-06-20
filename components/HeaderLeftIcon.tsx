import React from 'react';
import { Link } from 'expo-router';
import TabBarIcon from '@/components/Navigation/TabBarIcon';
import { View, TouchableOpacity } from 'react-native';

import * as Haptics from 'expo-haptics';

const HeaderLeftIcon: React.FC = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }}>
      <Link href="(tabs)">
        <View>
          <TabBarIcon name="leftcircleo" color="white" />
        </View>
      </Link>
    </TouchableOpacity>
  );
};

export default HeaderLeftIcon;
