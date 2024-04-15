import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import WalkingGoalIcon from '../../assets/achievements/walking_goal';
import WaterIntakeIcon from '../../assets/achievements/water_intake';
import NightTimeIcon from '../../assets/achievements/night_time_goal';
import ArrowRight from '../../assets/svg/arrow-right';
import { useResponsive } from 'react-native-responsive-hook';
import { ScrollView } from 'react-native';

const DailyGoals = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
     <View style={{ ...styles.dailyGoalsWrapper }}>
      <View style={{ ...styles.dailyGoalsHeader }}>
        <Text
          style={{
            ...styles.dailyGoalsText,
            ...styles.heading,
            ...styles.colorLight,
          }}
        >
          Your daily goals
        </Text>
        <TouchableOpacity>
          <ArrowRight></ArrowRight>
        </TouchableOpacity>
      </View>
         <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.dailyGoalsAchievements}
      >
      <View style={{ ...styles.dailyGoalsAchievements }}>
      <TouchableOpacity activeOpacity={0.6}>
            <WalkingGoalIcon />
            <View style={{ ...styles.dailyGoalsAchievementText }}>
              <Text style={{ ...styles.colorLight }}>Daily steps</Text>
              <Text style={{ flexDirection: "row" }}>
                <Text style={styles.dailyGoalsAchievementValueLight}>
                  200
                </Text>
                <Text style={styles.dailyGoalsAchievementValueLighter}>
                  {" "}
                  / 10,000
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <WaterIntakeIcon />
            <View style={{ ...styles.dailyGoalsAchievementText }}>
              <Text style={{ ...styles.colorLight }}>Water intake</Text>
              <Text style={{ flexDirection: "row" }}>
                <Text style={styles.dailyGoalsAchievementValueLight}>
                  200
                </Text>
                <Text style={styles.dailyGoalsAchievementValueLighter}>
                  {" "}
                  / 10,000
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <NightTimeIcon />
            <View style={{ ...styles.dailyGoalsAchievementText }}>
              <Text style={{ ...styles.colorLight }}>Night time routine</Text>
              <Text style={{ flexDirection: "row" }}>
                <Text style={styles.dailyGoalsAchievementValueLight}>
                  200
                </Text>
                <Text style={styles.dailyGoalsAchievementValueLighter}>
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

const useStyles = (vh) => StyleSheet.create({
  dailyGoalsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: vh(1.502),
    marginTop: vh(1.28),
  },
  dailyGoalsHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: vh(1.5),
  },
  dailyGoalsText: {
    fontSize: 20,
    color: '#FFF'
  },
  dailyGoalsAchievements: {
    display: "flex",
    flexDirection: "row",
    gap: vh(2.36051502),
  },
  dailyGoalsAchievementText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vh(0.429),
  },
  dailyGoalsAchievementValue: {
    color: '#FFF',
  },
  heading: {
    fontWeight: 'regular',
  },
  colorLight: {
    color: '#FFF'
  },
  dailyGoalsAchievementValueLight: {
    color: 'rgba(255, 255, 255, 0.2)'
  },
  dailyGoalsAchievementValueLighter: {
    color: 'rgba(255, 255, 255, 0.4)'
  }
});

export default DailyGoals;