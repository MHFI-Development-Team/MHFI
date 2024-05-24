import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';

const bmiHeight: React.FC = () => {
  const { age, weight } = useLocalSearchParams<{ age: string; weight: string }>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [heightCm, setHeightCm] = useState(162);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [heightFeet, setHeightFeet] = useState(5);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [heightInches, setHeightInches] = useState(4);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [unit, setUnit] = useState<'cm' | 'feet'>('cm');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!age || !weight) {
    return null;
  }

  const heightDisplay = unit === 'cm' ? `${heightCm} cm` : `${heightFeet}'${heightInches}"`;

  const calculateBMI = () => {
    let heightInMeters;
    const weightNum = parseFloat(weight);

    if (unit === 'cm') {
      heightInMeters = heightCm / 100;
    } else {
      heightInMeters = (heightFeet * 12 + heightInches) * 0.0254;
    }
    const bmi = weightNum / heightInMeters ** 2;
    return bmi.toFixed(1);
  };

  const handleNext = () => {
    const bmiResult = calculateBMI();
    router.push({
      pathname: '/resultScreen',
      params: {
        bmi: bmiResult,
        age,
        weight,
        height: unit === 'cm' ? `${heightCm} cm` : `${heightFeet}'${heightInches}"`,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Height</Text>
        <View style={styles.unitSwitchContainer}>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'cm' && styles.unitButtonActive]}
            onPress={() => setUnit('cm')}>
            <Text style={styles.unitButtonText}>CM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'feet' && styles.unitButtonActive]}
            onPress={() => setUnit('feet')}>
            <Text style={styles.unitButtonText}>Feet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.heightSliderContainer}>
          {unit === 'cm' ? (
            <Slider
              style={styles.slider}
              minimumValue={100}
              maximumValue={250}
              step={1}
              value={heightCm}
              onValueChange={setHeightCm}
              minimumTrackTintColor="#FFFF00"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="#FFFF00"
            />
          ) : (
            <>
              <Slider
                style={styles.slider}
                minimumValue={3}
                maximumValue={7}
                step={1}
                value={heightFeet}
                onValueChange={setHeightFeet}
                minimumTrackTintColor="#FFFF00"
                maximumTrackTintColor="#FFFFFF"
                thumbTintColor="#FFFF00"
              />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={11}
                step={1}
                value={heightInches}
                onValueChange={setHeightInches}
                minimumTrackTintColor="#FFFF00"
                maximumTrackTintColor="#FFFFFF"
                thumbTintColor="#FFFF00"
              />
            </>
          )}
          <Text style={styles.heightIndicator}>{heightDisplay}</Text>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  unitSwitchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  unitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
  },
  unitButtonActive: {
    backgroundColor: Colors.ButtonColor,
  },
  unitButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  heightSliderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  heightIndicator: {
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: Colors.ButtonColor,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default bmiHeight;
