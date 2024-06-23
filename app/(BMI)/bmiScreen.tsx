import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

import * as Haptics from 'expo-haptics';


import { Vibration } from 'react-native';
const windowWidth = Dimensions.get("window").width;
const bmiScreen: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [age, setAge] = useState(28);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [weight, setWeight] = useState(69);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const handleNext = () => {
    router.push({
      pathname: '/bmiHeight',
      params: { age, weight },
    });
  };



  return (
    
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>BMI Calculator</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.labelText}>Age</Text>
          <Slider
            style={styles.slider}
            minimumValue={18}
            maximumValue={100}
            step={1}
            value={age}
            onValueChange={setAge}
            minimumTrackTintColor="#FF922E"
            maximumTrackTintColor="#3E3E3E"
            thumbTintColor="#FF922E"
          />
          <Text style={styles.indicatorText}>{age}</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.labelText}>Weight (kg)</Text>
          <Slider
            style={styles.slider}
            minimumValue={30}
            maximumValue={200}
            step={1}
            value={weight}
            onValueChange={setWeight}
            minimumTrackTintColor="#FF922E"
            maximumTrackTintColor="#3E3E3E"
            thumbTintColor="#FF922E"
          />
          <Text style={styles.indicatorText}>{weight}</Text>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            handleNext();
          }}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: '#24263B',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  labelText: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  indicatorText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: Colors.ButtonColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#0C0F14',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default bmiScreen;
