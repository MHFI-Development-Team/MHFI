import React from 'react';
import { View } from 'react-native';
import globalStyles from '@/constants/globalStyles';
import Chatbot from '@/components/Messages/messages';

export default function BMILayout() {
  return (
    <View style={[globalStyles.container, { paddingHorizontal: 16 }]}>
      <Chatbot />
    </View>
  );
}
