import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import CircularCard from '../CircularCard';
import globalStyles from '@/constants/globalStyles';
import dailyGoalsTasks from '@/components/DailyGoals/dailyGoalsData';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const windowHeight = Dimensions.get('window').height;

const DailyGoals = () => {
  return (
    <View>
      <View style={styles.DailyGoalscontent}>
        <View>
          <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: 20 }]}>
            Your Daily Goals
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            {dailyGoalsTasks.map((goal, index) => (
              <Link key={index} href="/dailyGoalsEdit" asChild>
                <TouchableOpacity style={{ flexDirection: 'column' }}>
                  <CircularCard imageUri={goal.image} size={windowHeight * 0.125} />
                  <View style={{ marginTop: windowHeight * 0.005, alignItems: 'center' }}>
                    <Text style={[globalStyles.text, { fontWeight: '500' }]}>{goal.task}</Text>
                    <Text style={[globalStyles.text, { fontWeight: '500' }]}>
                      0 / {goal.maxtaskcount} Task{goal.maxtaskcount > 1 ? 's' : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
            <Link href="/dailyGoalsTasks" asChild>
              <TouchableOpacity style={styles.addButton}>
                <View style={styles.iconWrapper}>
                  <AntDesign name="plus" size={windowHeight * 0.05} color={Colors.ButtonColor} />
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DailyGoalscontent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  addButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: (windowHeight * 0.125) / 2,
    width: windowHeight * 0.125,
    height: windowHeight * 0.125,
  },
});

export default DailyGoals;
