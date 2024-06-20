import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, TouchableWithoutFeedback, Vibration } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const ResultScreen: React.FC = () => {
  
  const { bmi, age, weight, height } = useLocalSearchParams<{
    bmi: string;
    age: string;
    weight: string;
    height: string;
  }>();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string }>({ title: '', content: '' });

  const handleRetry = () => {
    router.push('/bmiScreen');
  };

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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

  const bmiInfo = {
    Underweight: 'BMI is less than 18.5. This might indicate malnutrition, an eating disorder, or other health issues. It’s recommended to consult a healthcare provider.',
    Normal: 'BMI is between 18.5 and 24.9. This range is considered healthy for most adults. Maintaining this BMI can help reduce the risk of serious health conditions.',
    Overweight: 'BMI is between 25 and 29.9. This can increase the risk of cardiovascular diseases, diabetes, and other health conditions. Consider a balanced diet and regular physical activity.',
    Obese: 'BMI is 30 or higher. This significantly increases the risk of many health issues including heart disease, diabetes, and certain cancers. Medical consultation is advised.'
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Result</Text>
        <View style={styles.resultCircle}>
          <Text style={styles.bmiValue}>{bmiValue}</Text>
          <Text style={[styles.bmiStatus, { color: bmiStatusColor }]}>{bmiStatus}</Text>
          <TouchableOpacity onPress={() => {Vibration.vibrate(50);openModal(bmiStatus, bmiInfo[bmiStatus]);}}>
            <Text style={styles.infoText}>Info</Text>
          </TouchableOpacity>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{modalContent.title}</Text>
              <Text style={styles.modalText}>{modalContent.content}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  infoText: {
    fontSize: 16,
    color: '#FFF',
    textDecorationLine: 'underline',
    marginTop: 10,
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
    fontSize: windowWidth * 0.02,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Colors.ButtonColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default ResultScreen;