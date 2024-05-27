import React from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '@/constants/globalStyles';
import ContentForYou from '@/components/ContentForYou/contentForYou';
import DailyGoals from '@/components/DailyGoals/dailyGoals';
import SuggestedTools from '@/components/SuggestTools/suggestTools';
import { View } from 'react-native';
import HabitList from '@/components/HabitTracker/HabitList';

const homeScreen = () => {
  return (
    <SafeAreaView
      style={[globalStyles.container, { paddingLeft: 16 }]}
      edges={['right', 'left', 'top']}>
      <Header />
      <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
        <ContentForYou />
        <SuggestedTools />
        <HabitList />
      </View>
    </SafeAreaView>
  );
};

export default homeScreen;
