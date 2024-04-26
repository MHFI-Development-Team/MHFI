import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ArrowRight from "../../assets/svg/arrow-right";
import { useResponsive } from "react-native-responsive-hook";
import { ScrollView } from "react-native";
import Circle from "../../assets/svg/circle";
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import AddMoreIcon from "../../assets/svg/addMoreIcon";
import { useNavigation } from "@react-navigation/native";


const DailyGoals = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  const navigation = useNavigation();

  const handleAddMorePress = () => {
    navigation.navigate('DailyGoalTasks');
  };

  return (
    <View>
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
      paddingRight: screenWidth * 0.05
    },
    titleText:{
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
    dailyGoalsAchievements: {
      flexDirection: "row",
      gap: 25,
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
      fontSize: 12,
    },
  });

export default DailyGoals;
