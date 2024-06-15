import React from 'react';
import { View } from 'react-native';
import globalStyles from '@/constants/globalStyles';
import Chatbot from '@/components/Messages/messages';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;

export default function BMILayout() {
  return (
    <View style={[globalStyles.container, { paddingHorizontal: windowWidth * 0.05 }]}>
      <Chatbot />
    </View>
  );
}
