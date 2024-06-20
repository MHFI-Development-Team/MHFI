import React from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '@/constants/globalStyles';
import ContentForYou from '@/components/ContentForYou/contentForYou';
import SuggestedTools from '@/components/SuggestTools/suggestTools';
import { View } from 'react-native';
import EmotionList from '@/components/EmotionTracker/EmotionList';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const homeScreen = () => {
  return (
    <SafeAreaView
      style={[globalStyles.container]} 
      edges={['right', 'left', 'top']}
    >
      <Header />
      <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
        <View style={{ paddingHorizontal: windowWidth * 0.05 }}>
          <ContentForYou />
          <SuggestedTools />
        </View>
        <EmotionList />
      </View>
    </SafeAreaView>
  );
};

export default homeScreen;
