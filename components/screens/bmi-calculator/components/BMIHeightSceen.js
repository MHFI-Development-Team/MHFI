import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Slider,
  TouchableOpacity,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const BMIHeightScreen = ({ navigation, route }) => {
    const { age, weight } = route.params; // Receive weight and age from the previous screen
    const [heightCm, setHeightCm] = useState(162); // Default height in centimeters
    const [heightFeet, setHeightFeet] = useState(5); // Default feet part of the height
    const [heightInches, setHeightInches] = useState(4); // Default inches part of the height
    const [unit, setUnit] = useState("cm"); // Default unit


  const heightDisplay =
    unit === "cm" ? `${heightCm} cm` : `${heightFeet}'${heightInches}"`;

    const calculateBMI = () => {
        let heightInMeters;
        if (unit === "cm") {
          heightInMeters = heightCm / 100;
        } else { // Conversion from feet and inches to meters
          heightInMeters = (heightFeet * 12 + heightInches) * 0.0254;
        }
        const bmi = weight / (heightInMeters ** 2);
        return bmi.toFixed(1); // Return BMI rounded to one decimal place
      };
    
      const handleNext = () => {
        const bmiResult = calculateBMI();
        navigation.navigate('BMIResultScreen', { bmi: bmiResult, age, weight, height: unit === "cm" ? `${heightCm} cm` : `${heightFeet}'${heightInches}"` });
      };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Height</Text>
        <View style={styles.unitSwitchContainer}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              unit === "cm" ? styles.unitButtonActive : null,
            ]}
            onPress={() => setUnit("cm")}
          >
            <Text style={styles.unitButtonText}>CM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              unit === "feet" ? styles.unitButtonActive : null,
            ]}
            onPress={() => setUnit("feet")}
          >
            <Text style={styles.unitButtonText}>Feet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.heightSliderContainer}>
          {unit === "cm" ? (
            <Slider
              style={styles.slider}
              minimumValue={100}
              maximumValue={250}
              step={1}
              value={heightCm}
              onValueChange={setHeightCm}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
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
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFF00"
              />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={11}
                step={1}
                value={heightInches}
                onValueChange={setHeightInches}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
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
    backgroundColor: "#0C0F14",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  unitSwitchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  unitButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#24263B",
  },
  unitButtonActive: {
    backgroundColor: "#444",
  },
  unitButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
  heightSliderContainer: {
    width: screenWidth - 40,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  slider: {
    width: screenWidth - 80,
    height: 40,
    marginVertical: 10,
  },
  heightIndicator: {
    color: "#FFF",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#24263B",
    padding: 10,
    borderRadius: 10,
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
  },
});

export default BMIHeightScreen;
