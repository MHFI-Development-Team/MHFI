import { React, useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ArrowRight from "../../assets/svg/arrow-right";
import { useResponsive } from "react-native-responsive-hook";
import { ScrollView } from "react-native";
import Circle from "../../assets/svg/circle";
import { Dimensions } from "react-native";
import AddMoreIcon from "../../assets/svg/addMoreIcon";
import { useNavigation } from "@react-navigation/native";
import DailyGoalsContext from "./DailyGoalsContext";
import { tasksByCategory } from "../screens/DailyGoalTaskScreen";

const screenWidth = Dimensions.get("window").width;

export default DailyGoals = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);
  const navigation = useNavigation();

  const handleAddMorePress = () => {
    navigation.navigate("DailyGoalTasks");
  };

  const handlePress = (index) => () => {
    navigation.navigate("GoalManagement", { goalIndex: index });
  };

  const { goals } = useContext(DailyGoalsContext);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your daily goals</Text>
        <TouchableOpacity>
          <ArrowRight></ArrowRight>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 25 }}>
          {goals.map((goal, index) => 
             (
              <View key={index} style={styles.dailyGoalsAchievements}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handlePress(index)}
                >
                  <Circle />
                  <View style={styles.dailyGoalsAchievementText}>
                    <Text style={styles.cardTitle}>{goal.title}</Text>
                    <Text style={styles.dailyGoalsAchievementValue}>
                      {goal?.completedTasks?.length || 0} / {goal?.totalTasks?.length || 0} Task
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          )
          }
          <TouchableOpacity onPress={handleAddMorePress} activeOpacity={0.6}>
            <AddMoreIcon />
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
      marginBottom: 10,
      paddingRight: screenWidth * 0.05,
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
    dailyGoalsAchievements: {
      flexDirection: "row",
    },
    dailyGoalsAchievementText: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: vh(0.429),
    },
    cardTitle: {
      color: "#FFF",
      fontSize: 14,
      fontWeight: "600",
    },
    dailyGoalsAchievementValue: {
      color: "#FF922E",
      fontSize: 12,
    },
  });
