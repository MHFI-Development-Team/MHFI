import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Slider from '@react-native-community/slider';
const screenWidth = Dimensions.get("window").width;

const BMIWeightScreen = ({ route, navigation }) => {
  const [age, setAge] = useState(28);
  const [weight, setWeight] = useState(69);

  const handleNext = () => {
    navigation.navigate("BMIHeight", { age, weight });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>BMI Calculator</Text>
        </View>
        <View style={styles.ageSliderContainer}>
          <Text style={styles.ageText}>Age</Text>
          <Slider
            style={styles.slider}
            minimumValue={18}
            maximumValue={100}
            step={1}
            value={age}
            onValueChange={(value) => setAge(value)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text style={styles.ageIndicator}>{age}</Text>
        </View>
        <View style={styles.weightSliderContainer}>
          <Text style={styles.weightText}>Weight (kg)</Text>
          <Slider
            style={styles.slider}
            minimumValue={30}
            maximumValue={200}
            step={1}
            value={weight}
            onValueChange={(value) => setWeight(value)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text style={styles.weightIndicator}>{weight}</Text>
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
    backgroundColor: "#0C0F14",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownContainer: {
    backgroundColor: "#24263B",
    width: screenWidth - 40,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownText: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
  },
  ageSliderContainer: {
    width: screenWidth - 40,
  },
  ageText: {
    color: "#FFF",
    textAlign: "center",
  },
  slider: {
    width: screenWidth - 80,
    height: 40,
  },
  ageIndicator: {
    color: "#FFF",
    fontSize: 24,
    textAlign: "center",
  },
  weightSliderContainer: {
    width: screenWidth - 40,
    marginTop: 20,
  },
  weightText: {
    color: "#FFF",
    textAlign: "center",
  },
  weightIndicator: {
    color: "#FFF",
    fontSize: 24,
    textAlign: "center",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#24263B",
    color: "#FFF",
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default BMIWeightScreen;
