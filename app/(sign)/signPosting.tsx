import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { signPostLinks } from './signPostingData';
import { Colors } from '@/constants/Colors';

import * as Haptics from 'expo-haptics';

const SignPosting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Links Directory</Text>
      {signPostLinks.map((link, index) => (
        <TouchableOpacity
        activeOpacity={0.8}
          key={index}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Linking.openURL(link.href);
          }}
          style={styles.linkContainer}>
          <Text style={styles.linkText}>{link.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.primary,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkContainer: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkText: {
    color: Colors.ButtonColor,
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignPosting;
