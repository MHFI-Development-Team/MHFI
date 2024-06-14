import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import { useProfile } from './ProfileContext';
import TabBarIcon from './Navigation/TabBarIcon';

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
    backgroundColor: '#FFF',
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
  "Ready to achieve your goals today?",
  "What's on your agenda for today?",
  "Let's make today productive!",
  "What will you accomplish today?",
  "How can you make today great?",
  "Let's make today count!",
  "What are you focusing on today?",
  "How can you improve today?",
  "What's your plan for success today?",
  "Let's tackle today's challenges!",
  "Push yourself to be the best!",
  "Embrace the opportunities ahead!",
  "Make every moment count!",
  "Your potential is limitless!",
  "Focus on your strengths today!",
  "Believe in your abilities!",
  "Seize the day with confidence!",
  "Strive for excellence!",
  "Every day is a new beginning!",
  "Make today unforgettable!",
  "Success is within your reach!",
  "Chase your dreams with passion!",
  "Overcome every obstacle!",
  "Your hard work will pay off!",
  "Stay positive and motivated!",
  "Set your sights high!",
  "Dream big and take action!",
  "You are capable of greatness!",
  "Inspire others with your actions!",
  "Stay focused and driven!",
];

const getDailyPhrase = () => {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = (new Date().getTime() - start.getTime()) + ((start.getTimezoneOffset() - new Date().getTimezoneOffset()) * 60 * 1000);
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return motivationalPhrases[dayOfYear % motivationalPhrases.length];
};

export default function Header() {
  const { profilePicture, name } = useProfile();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {getGreeting()}
          {name ? `, ${name}` : ''}
        </Text>
        <Text style={styles.subText}>{getDailyPhrase()}</Text>
      </View>
      <TouchableOpacity style={styles.profileSection}>
        <Link href="/profile">
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          ) : (
            <TabBarIcon name="user" color="white" />
          )}
        </Link>
      </TouchableOpacity>
    </View>
  );
}