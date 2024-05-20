import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '@/constants/globalStyles';
import ContentForYou from '@/components/ContentForYou/contentForYou';
import DailyGoals from '@/components/DailyGoals/dailyGoals';
import SuggestedTools from '@/components/SuggestTools/suggestTools';

const homeScreen = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header />
      <DailyGoals />
      <SuggestedTools />
      <ContentForYou />
    </SafeAreaView>
  );
};

export default homeScreen;
