import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import globalStyles from '@/constants/globalStyles';
import EmotionCard from '@/components/EmotionTracker/EmotionCard';
import { useProfile } from '@/components/ProfileContext';
import PulsatingCircle from './PulsatingCircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const EmotionList: React.FC = () => {
  const { todayEmotion, todayRecommendation } = useProfile();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.ButtonColor} />
      </View>
    );
  }

  return (
    <View style={{ transform: [{ translateY: -20 }] }}>
      <View style={styles.EmotionListContent}>
        <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: 20, marginLeft: windowWidth * 0.05 }]}>
          Emotion Tracker
        </Text>
        {todayEmotion ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            snapToInterval={windowWidth}
            snapToAlignment="center"
            decelerationRate="fast"
            pagingEnabled
          >
            <View style={styles.emotionCardWrapper}>
              <View style={styles.emotionCardContainer}>
                <EmotionCard type="emotion" text={todayEmotion} />
              </View>
            </View>
            <View style={styles.emotionCardWrapper}>
              <View style={styles.emotionCardContainer}>
                <EmotionCard type="recommendation" text={todayRecommendation} />
              </View>
            </View>
          </ScrollView>
        ) : (
          <TouchableOpacity onPress={() => router.push('/messageScreen')} style={styles.checkInMessage}>
            <View style={styles.checkInMessageContent}>
              <View style={styles.textAndTriangleContainer}>
                <Text style={styles.checkInText}>
                  No emotion {'\n'}recorded today.{'\n'}{'\n'}Tap here to check in!
                </Text>
                <PulsatingCircle colors={['#FF922E', '#303345', '#171621']} style={styles.triangleContainer} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  EmotionListContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  emotionCardWrapper: {
    width: windowWidth,
    alignItems: 'center',
  },
  emotionCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
   
  },
  checkInMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    height: windowHeight * 0.2,
    borderWidth: 1,
    borderColor: Colors.ButtonColor,
    width: windowWidth - 40,
    alignSelf: 'center',
     overflow: "visible"
  },
  checkInMessageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textAndTriangleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkInText: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    marginRight: windowHeight * 0.06,
    textAlign: 'left',
  },
  triangleContainer: {
    marginTop: windowHeight * 0.02,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});

export default EmotionList;