import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import ArrowRight from "../../assets/svg/arrow-right";
import { useResponsive } from "react-native-responsive-hook";
import { ScrollView } from "react-native";
import Circle from "../../assets/svg/circle";

const DailyGoals = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <View style={{ backgroundColor: "blue" }}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your daily goals</Text>
        <TouchableOpacity>
          <ArrowRight></ArrowRight>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.dailyGoalsAchievements}>
          <TouchableOpacity activeOpacity={0.6}>
            <Circle />
            <View style={styles.dailyGoalsAchievementText}>
              <Text style={styles.cardTitle}>Daily steps</Text>
              <Text>
                <Text style={styles.dailyGoalsAchievementValue}>200</Text>
                <Text style={styles.dailyGoalsAchievementValue}>
                  {" "}
                  / 10,000
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = (vh) =>
  StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    },
    titleText:{
      fontSize: 16,
      fontWeight: "bold",
      color: "white"
    },
    dailyGoalsAchievements: {
      flexDirection: "row",
      gap: 25,
      backgroundColor: "black"
    },
    dailyGoalsAchievementText: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: vh(0.429),
    },
    cardTitle: {
      color: "#FFF",
      fontSize: 14,
      fontWeight: "600"
    },
    dailyGoalsAchievementValue: {
      color: "#DC3535",
      fontSize: 14,
    },
  });

export default DailyGoals;
