import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import EmotionTriangles from './PulsatingCircle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface EmotionCardProps {
  type: 'emotion' | 'recommendation';
  text: string;
}

const EmotionCard: React.FC<EmotionCardProps> = ({ type, text }) => {
  const displayText = type === 'emotion' ? `You are feeling ${text}` : `Recommendation: ${text}`;

  return (
    <View style={styles.card}>
      <View style={styles.animationContainer}>
        <PulsatingCircle />
      </View>
      <Text style={styles.cardText}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: windowWidth - 40,
    height: windowHeight * 0.6, // Increased height
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center', // Center text vertically
  },
  animationContainer: {
    height: 300,
    width: 300,
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center', // Added to center the text horizontally
  },
});

export default EmotionCard;