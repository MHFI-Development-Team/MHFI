import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Vibration } from 'react-native';

const Quiz = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Quiz</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.ButtonColor }]}
        onPress={() => {{Vibration.vibrate(50);
          router.push({ pathname: '/(quiz)/[quiz]', params: { category: 'Smoking' } })
        }}}>
        <Text style={styles.buttonText}>Smoking</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.ButtonColor }]}
        onPress={() => {{Vibration.vibrate(50);
          router.push({ pathname: '/(quiz)/[quiz]', params: { category: 'Drinking' } })
        }}}>
        <Text style={styles.buttonText}>Drinking</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.ButtonColor }]}
        onPress={() => {{Vibration.vibrate(50); router.push({ pathname: '/(quiz)/[quiz]', params: { category: 'Drugs' } })}}}>
        <Text style={styles.buttonText}>Drugs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background, 
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Quiz;
