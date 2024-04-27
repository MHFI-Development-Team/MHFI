import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useResponsive } from "react-native-responsive-hook";
import BmiIcon from "../../assets/svg/SuggestToolSVG/bmiIcon";
import { ScrollView } from "react-native";
import SmokingIcon from "../../assets/svg/SuggestToolSVG/smokingIcon";
import AlchololIcon from "../../assets/svg/SuggestToolSVG/alchololIcon";
import GeoIcon from "../../assets/svg/SuggestToolSVG/geoIcon";
import QuizIcon from "../../assets/svg/SuggestToolSVG/QuizIcon";
import SignIcon from "../../assets/svg/SuggestToolSVG/signIcon";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SuggestedTools = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  const navigation = useNavigation();

  const handleBMICalcPress = () => {
    navigation.navigate("BMICalc");
  };
  const handleSmokeCalcPress = () => {
    navigation.navigate("SmokeCalc");
  };
  const handleAlchololCalcPress = () => {
    navigation.navigate("AlchololCalc");
  };
  const handleGeoPress = () => {
    navigation.navigate("Geo");
  };
  const handleQuizPress = () => {
    navigation.navigate("Quiz");
  };
  const handleSignPostPress = () => {
    navigation.navigate("SignPost");
  };
  
  return (
    <View style={styles.toolsWrapper}>
      <Text style={styles.title}>Suggested tools</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.toolsContainer}>
          {/* BMI */}
          <TouchableOpacity onPress={handleBMICalcPress} activeOpacity={0.6}>
            <View style={styles.tool}>
              <BmiIcon />
              <Text style={styles.toolName}>BMI Calculator</Text>
            </View>
          </TouchableOpacity>
          {/* Smoking */}
          <TouchableOpacity onPress={handleSmokeCalcPress} activeOpacity={0.6}>
            <View style={styles.tool}>
              <SmokingIcon />
              <Text style={styles.toolName}>Smoking Calculator</Text>
            </View>
          </TouchableOpacity>
          {/* Alcholol */}
          <TouchableOpacity onPress={handleAlchololCalcPress} activeOpacity={0.6}>
            <View style={styles.tool}>
              <AlchololIcon />
              <Text style={styles.toolName}>Alchohol Calculator</Text>
            </View>
          </TouchableOpacity>
          {/* GEO-Locator */}
          <TouchableOpacity onPress={handleGeoPress} activeOpacity={0.6}>
            <View style={styles.tool}>
              <GeoIcon />
              <Text style={styles.toolName}>GEO-Locator</Text>
            </View>
          </TouchableOpacity>
          {/* Quiz */}
          <TouchableOpacity onPress={handleQuizPress} activeOpacity={0.6}>
            <View style={styles.tool}>
              <QuizIcon />
              <Text style={styles.toolName}>Quiz</Text>
            </View>
          </TouchableOpacity>
          {/* Sign-Posting Tool */}
          <TouchableOpacity onPress={handleSignPostPress} activeOpacity={0.6}>
            <View style={styles.tool}>
              <SignIcon />
              <Text style={styles.toolName}>Sign-Posting Tool</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = (vh) =>
  StyleSheet.create({
    toolsWrapper: {
      gap: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
    toolsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 34,
    },
    tool: {
      alignItems: "center",
    },
    toolName: {
      color: "#FFFFFF",
      fontSize: 14,
      marginTop: vh(0.429),
      fontWeight: "600",
      textAlign: "center",
    },
  });

export default SuggestedTools;
