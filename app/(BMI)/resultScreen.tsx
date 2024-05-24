import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';

const ResultScreen: React.FC = () => {
  const { bmi, age, weight, height } = useLocalSearchParams<{
    bmi: string;
    age: string;
    weight: string;
    height: string;
  }>();
  const router = useRouter();

  const handleRetry = () => {
    router.push('/bmiScreen');
  };

  if (!bmi || !age || !weight || !height) {
    return null;
  }

  const bmiValue = parseFloat(bmi);
  const bmiStatus =
    bmiValue < 18.5
      ? 'Underweight'
      : bmiValue <= 24.9
        ? 'Normal'
        : bmiValue <= 29.9
          ? 'Overweight'
          : 'Obese';

  const bmiStatusColor = bmiValue < 18.5 ? 'red' : bmiValue <= 24.9 ? 'green' : 'red';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Result</Text>
        <View style={styles.resultCircle}>
          <Text style={styles.bmiValue}>{bmiValue}</Text>
          <Text style={[styles.bmiStatus, { color: bmiStatusColor }]}>{bmiStatus}</Text>
        </View>
        <View style={styles.bodyComposition}>
          <Text style={styles.bodyCompositionTitle}>Body Composition</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{age}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{height}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{weight} kg</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30,
  },
  resultCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.ButtonColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
  },
  bmiStatus: {
    fontSize: 18,
    marginTop: 5,
  },
  bodyComposition: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  bodyCompositionTitle: {
    fontSize: 22,
    color: '#FFF',
    marginBottom: 10,
  },
  infoBox: {
    width: '90%',
    backgroundColor: '#24263B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 18,
    color: '#FFF',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  retryButton: {
    backgroundColor: Colors.ButtonColor,
    borderRadius: 20,
    marginTop: 30,
  },
  retryButtonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
});

export default ResultScreen;
