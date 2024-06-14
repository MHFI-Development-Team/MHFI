import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HabitCard from '@/components/HabitTracker/HabitCard';
import { Colors } from '@/constants/Colors';
import globalStyles from '@/constants/globalStyles';

const windowHeight = Dimensions.get('window').height;

export interface Habit {
  id: string;
  habitName: string;
  subTasks: { id: string; name: string }[];
  imageUri: string | null;
  date: string;
  notes: string;
}

const HabitList: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const loadHabits = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('habits');
      if (storedHabits) {
        const parsedHabits = JSON.parse(storedHabits);
        const validHabits = parsedHabits.filter(
          (habit: Habit) => habit && habit.id && habit.habitName
        );
        if (validHabits.length !== parsedHabits.length) {
          await AsyncStorage.setItem('habits', JSON.stringify(validHabits));
        }
        setHabits(validHabits);
      } else {
        setHabits([]);
      }
    } catch (error) {
      console.error('Failed to load habits', error);
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadHabits();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.ButtonColor} />
      </View>
    );
  }

  const handlePress = (habitId: string) => {
    router.push(`(habitracking)/HabitDetails/${habitId}`);
  };

  const handleLongPress = (habitId: string) => {
    router.push(`(habitracking)/HabitEdit/${habitId}`);
  };

  return (
    <View style={{ transform: [{ translateY: -20 }] }}>
      <View style={styles.HabitListContent}>
        <View>
          <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: 20 }]}>
            Your Habits
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10, overflow: "visible" }}>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            {habits.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text>No habits available</Text>
              </View>
            ) : (
              habits.map(habit => (
                <HabitCard
                  key={habit.id}
                  habitName={habit.habitName}
                  subTasks={habit.subTasks}
                  imageUri={habit.imageUri}
                  date={habit.date}
                  notes={habit.notes}
                  onPress={() => handlePress(habit.id)}
                  onLongPress={() => handleLongPress(habit.id)}
                />
              ))
            )}
            <Link href="/AddHabit" asChild>
              <TouchableOpacity style={styles.addButton}>
                <View style={styles.iconWrapper}>
                  <Ionicons
                    name="add-circle"
                    size={windowHeight * 0.05}
                    color={Colors.ButtonColor}
                  />
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
  HabitListContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default HabitList;
