import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import CircularCard from '../CircularCard';
import globalStyles from '@/constants/globalStyles';
import dailyGoalsTasks from '@/components/DailyGoals/dailyGoalsData';

const DailyGoals = () => {
  return (
    <View style={styles.DailyGoalscontent}>
      <View>
        <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: 20 }]}>
          Your Daily Goals
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 25 }}>
          {dailyGoalsTasks.map((goal, index) => (
            <Link key={index} href="/dailyGoalsTasks" asChild>
              <TouchableOpacity
                key={index}
                style={{ flexDirection: 'column', alignItems: 'center' }}>
                <CircularCard imageUri={goal.image} size={150} />
                <Text style={[globalStyles.text, { fontWeight: '500' }]}>{goal.task}</Text>
                <Text style={[globalStyles.text, { fontWeight: '500' }]}>
                  0 / {goal.maxtaskcount} Task{goal.maxtaskcount > 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  DailyGoalscontent: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },
});

export default DailyGoals;
