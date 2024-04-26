import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useResponsive } from "react-native-responsive-hook";
import BmiIcon from "../../assets/svg/bmiIcon";
import { ScrollView } from "react-native";

const SuggestedTools = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <View style={styles.toolsWrapper}>
      <Text style={styles.title}>Suggested Tools</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.toolsContainer}>
          <View style={styles.tool}>
            <BmiIcon />
            <Text style={styles.toolName}>BMI Calculator</Text>
          </View>
          {/* TODO: Add all suggested tool + icons */}
          <View style={styles.tool}>
            <BmiIcon />
            <Text style={styles.toolName}>BMI Calculator</Text>
          </View>
          {/* TODO: Add all suggested tool + icons */}
          <View style={styles.tool}>
            <BmiIcon />
            <Text style={styles.toolName}>BMI Calculator</Text>
          </View>
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
      fontSize: 16,
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
