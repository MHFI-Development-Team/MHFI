import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useProfile } from '../ProfileContext';
import PulsatingCircle from './PulsatingCircle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface EmotionCardProps {
  type: 'emotion' | 'recommendation';
  text: string;
}

const EmotionCard: React.FC<EmotionCardProps> = ({ type, text }) => {
  const { emotionBackground, recommendationBackground, emotionColors, recommendationColors } =
    useProfile();
  const displayText = type === 'emotion' ? `${text}` : `Recommendation: ${text}`;
  const backgroundColor = type === 'emotion' ? emotionBackground : recommendationBackground;
  const colors = type === 'emotion' ? emotionColors : recommendationColors;

  return (
    <View style={styles.centerContainer}>
      <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.textContainer}>
          <Text style={styles.cardText}>{displayText}</Text>
        </View>
        <View style={styles.animationContainer}>
          <PulsatingCircle colors={colors} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    height: windowHeight * 0.2,
    width: windowWidth - 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  animationContainer: {
    height: windowHeight * 0.15,
    width: windowHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'left',
  },
});

export default EmotionCard;