import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import { useProfile } from '../contexts/ProfileContext';
import UserIcon from '@/assets/svg/UserIcon'; // Make sure this path is correct

import * as Haptics from 'expo-haptics';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingVertical: windowHeight * 0.015,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingContainer: {
    flexDirection: 'column',
  },
  greetingText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',

  },
  subText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '300',

  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
   
  },
  profileName: {
    color: '#FFF',
    fontSize: 18,
  },
});

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

const motivationalPhrases = [
  'Ready to achieve your goals today?',
  "What's on your agenda for today?",
  "Let's make today productive!",
  'What will you accomplish today?',
  'How can you make today great?',
  "Let's make today count!",
  'What are you focusing on today?',
  'How can you improve today?',
  "What's your plan for success today?",
  "Let's tackle today's challenges!",
  'Push yourself to be the best!',
  'Embrace the opportunities ahead!',
  'Make every moment count!',
  'Your potential is limitless!',
  'Focus on your strengths today!',
  'Believe in your abilities!',
  'Seize the day with confidence!',
  'Strive for excellence!',
  'Every day is a new beginning!',
  'Make today unforgettable!',
  'Success is within your reach!',
  'Chase your dreams with passion!',
  'Overcome every obstacle!',
  'Your hard work will pay off!',
  'Stay positive and motivated!',
  'Set your sights high!',
  'Dream big and take action!',
  'You are capable of greatness!',
  'Inspire others with your actions!',
  'Stay focused and driven!',
  "Remember, small steps lead to big achievements!",
  "Face today's challenges with courage!",
  "Turn today's efforts into tomorrow's successes!",
  "Believe in the power of persistence!",
  "Harness your energy for maximum impact!",
  "Confidence and hard work are your allies!",
  "Make each task a step toward your dreams!",
  "Embrace the grind; success is near!",
  "Consistency is key to achieving greatness!",
  "Every effort you make moves you forward!",
  "Let your actions speak louder than words!",
  "Take control of your day and own it!",
  "Your determination defines your path!",
  "Stay relentless in your pursuit of excellence!",
  "Let go of doubts and embrace confidence!",
  "Channel your inner strength and succeed!",
  "Elevate your mindset, elevate your life!",
  "Transform obstacles into opportunities!",
  "Be the hero of your own story today!",
  "Your journey to greatness starts now!"
];

const getDailyPhrase = () => {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff =
    new Date().getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - new Date().getTimezoneOffset()) * 60 * 1000;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return motivationalPhrases[dayOfYear % motivationalPhrases.length];
};

export default function Header() {
  const { profilePicture, name } = useProfile();

  return (
    <View style={[styles.headerContainer, {paddingHorizontal: windowWidth * 0.05,}]}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {getGreeting()}
          {name ? `, ${name}` : ''}
        </Text>
        <Text style={styles.subText}>{getDailyPhrase()}</Text>
      </View>
      <TouchableOpacity
      activeOpacity={0.8}
        style={styles.profileSection}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}>
        <Link href="/profile">
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          ) : (
            <View style={styles.profilePicture}>
              <UserIcon width={40} height={40} />
            </View>
          )}
        </Link>
      </TouchableOpacity>
    </View>
  );
}
