import React from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '@/constants/globalStyles';
import ContentForYou from '@/components/ContentForYou/contentForYou';
import DailyGoals from '@/components/DailyGoals/dailyGoals';
import SuggestedTools from '@/components/SuggestTools/suggestTools';
import { View } from 'react-native';

const homeScreen = () => {
  return (
    <SafeAreaView style={[globalStyles.container, { paddingLeft: 0 }]}>
      <Header />
      <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
        <ContentForYou />
        <SuggestedTools />
        <DailyGoals />
      </View>
    </SafeAreaView>
  );
};

export default homeScreen;