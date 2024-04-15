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
              <Text
                style={{
                  ...styles.dailyGoalsAchievementValue,
                  ...styles.colorLight,
                }}
              >
                200 / 10,000
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <WaterIntakeIcon />
            <View style={{ ...styles.dailyGoalsAchievementText }}>
              <Text style={{ ...styles.colorLight }}>Water intake</Text>
              <Text
                style={{
                  ...styles.dailyGoalsAchievementValue,
                  ...styles.colorLight,
                }}
              >
                200ml / 3,000
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <NightTimeIcon />
            <View style={{ ...styles.dailyGoalsAchievementText }}>
              <Text style={{ ...styles.colorLight }}>Night time routine</Text>
              <Text
                style={{
                  ...styles.dailyGoalsAchievementValue,
                  ...styles.colorLight,
                }}
              >
                2 / 3 tasks
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
    marginTop: vh(1.28)
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
  }
});

export default DailyGoals;