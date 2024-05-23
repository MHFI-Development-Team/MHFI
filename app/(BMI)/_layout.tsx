import React from 'react';
import { View } from 'react-native';
import globalStyles from '@/constants/globalStyles';
import { Slot } from 'expo-router';

export default function BMILayout() {
  return (
    <View style={[globalStyles.container, { paddingHorizontal: 16 }]}>
      <Slot />
    </View>
  );
}
