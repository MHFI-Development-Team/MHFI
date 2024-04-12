import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native-web";
import { globalStyles } from "../../assets/style/globalStyle";
import { homeStyles } from "../../assets/style/homeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { Touchable } from "react-native";
import WalkingGoalIcon from "../../assets/svg/walking_goals";

export default function DailyGoals() {
    return (
      <View style={homeStyles.goalContainer}>
        <View style={homeStyles.header}>
          <Text style={homeStyles.headerTitle}>Your daily goals</Text>
        </View>
        <SafeAreaView style={homeStyles.dailyGoalsAchievement}>
          <ScrollView style={homeStyles.flatList} horizontal={true}>
            <TouchableOpacity style={homeStyles.TouchableOpacityStyle}>
              <WalkingGoalIcon />
              <View style={homeStyles.dailyGoalsAchievementText}>
                <Text style={homeStyles.colorLight}>Daily Steps</Text>
                <Text style={{ flexDirection: "row" }}>
                  <Text style={homeStyles.dailyGoalsAchievementValueLight}>200</Text>
                  <Text style={homeStyles.dailyGoalsAchievementValueLighter}> / 10,000</Text>
                </Text>
              </View>
            </TouchableOpacity>
            {/* TODO: Replace repeated TouchableOpacity components with a map()
                that renders components based on data array. Making it more scalable and usable */}
            <TouchableOpacity style={homeStyles.TouchableOpacityStyle}>
              <WalkingGoalIcon />
              <View style={homeStyles.dailyGoalsAchievementText}>
                <Text style={homeStyles.colorLight}>Daily Steps</Text>
                <Text style={{ flexDirection: "row" }}>
                  <Text style={homeStyles.dailyGoalsAchievementValueLight}>200</Text>
                  <Text style={homeStyles.dailyGoalsAchievementValueLighter}> / 10,000</Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.TouchableOpacityStyle}>
              <WalkingGoalIcon />
              <View style={homeStyles.dailyGoalsAchievementText}>
                <Text style={homeStyles.colorLight}>Daily Steps</Text>
                <Text style={{ flexDirection: "row" }}>
                  <Text style={homeStyles.dailyGoalsAchievementValueLight}>200</Text>
                  <Text style={homeStyles.dailyGoalsAchievementValueLighter}> / 10,000</Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.TouchableOpacityStyle}>
              <WalkingGoalIcon />
              <View style={homeStyles.dailyGoalsAchievementText}>
                <Text style={homeStyles.colorLight}>Daily Steps</Text>
                <Text style={{ flexDirection: "row" }}>
                  <Text style={homeStyles.dailyGoalsAchievementValueLight}>200</Text>
                  <Text style={homeStyles.dailyGoalsAchievementValueLighter}> / 10,000</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }