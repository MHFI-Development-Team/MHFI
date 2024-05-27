import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '@/components/HabitTracker/HabitList';
import { useFocusEffect } from '@react-navigation/native';

const HabitDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [habit, setHabit] = useState<Habit | null>(null);

  const fetchHabit = async () => {
    const storedHabits = await AsyncStorage.getItem('habits');
    if (storedHabits) {
      const parsedHabits = JSON.parse(storedHabits) as Habit[];
      const selectedHabit = parsedHabits.find(h => h.id === id);
      setHabit(selectedHabit || null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHabit();
    }, [id])
  );

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Habit not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {habit.imageUri && <Image source={{ uri: habit.imageUri }} style={styles.image} />}
      <Text style={styles.habitName}>{habit.habitName}</Text>
      <Text style={styles.date}>Due Date {new Date(habit.date).toLocaleDateString()}</Text>
      <Text style={styles.notes}>Notes</Text>
      <Text style={styles.notes}>{habit.notes}</Text>
      <View style={styles.subTasksContainer}>
        <Text>Sub tasks</Text>
        {habit.subTasks.map(subTask => (
          <Text key={subTask.id} style={styles.subTask}>
            {subTask.name}
          </Text>
        ))}
      </View>
      <Button title="Edit Habit" onPress={() => router.push(`/HabitEdit/${habit.id}`)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  habitName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  notes: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  subTasksContainer: {
    marginBottom: 16,
  },
  subTask: {
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default HabitDetails;
