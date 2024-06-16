import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Habit } from '@/components/EmotionTracker/HabitList';

const HabitEdit: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [habitName, setHabitName] = useState('');
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [newSubTask, setNewSubTask] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchHabit = async () => {
      const storedHabits = await AsyncStorage.getItem('habits');
      if (storedHabits) {
        const parsedHabits = JSON.parse(storedHabits) as Habit[];
        const selectedHabit = parsedHabits.find(h => h.id === id);
        if (selectedHabit) {
          setHabit(selectedHabit);
          setHabitName(selectedHabit.habitName);
          setSubTasks(selectedHabit.subTasks.map(subTask => subTask.name));
          setImageUri(selectedHabit.imageUri);
          setDate(new Date(selectedHabit.date));
          setNotes(selectedHabit.notes);
        }
      }
    };

    fetchHabit();
  }, [id]);

  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([...subTasks, newSubTask]);
      setNewSubTask('');
    }
  };

  const handleRemoveSubTask = (index: number) => {
    const updatedSubTasks = subTasks.filter((_, i) => i !== index);
    setSubTasks(updatedSubTasks);
  };

  const handleSaveHabit = async () => {
    if (habitName.trim() === '') {
      Alert.alert('Error', 'Habit name cannot be empty');
      return;
    }

    const updatedHabit: Habit = {
      ...habit,
      habitName,
      subTasks: subTasks.map((subTask, index) => ({ id: index.toString(), name: subTask })),
      imageUri,
      date: date.toISOString(),
      notes,
    } as Habit;

    try {
      const storedHabits = await AsyncStorage.getItem('habits');
      const habits = storedHabits ? JSON.parse(storedHabits) : [];
      const updatedHabits = habits.map((h: { id: string }) =>
        h.id === updatedHabit.id ? updatedHabit : h
      );
      await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to save habit');
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Habit Name</Text>
      <TextInput
        style={styles.input}
        value={habitName}
        onChangeText={setHabitName}
        placeholder="Enter habit name"
      />
      <Text style={styles.label}>Sub-Tasks</Text>
      {subTasks.map((subTask, index) => (
        <View key={index} style={styles.subTaskContainer}>
          <Text style={styles.subTask}>{subTask}</Text>
          <Button title="Remove" onPress={() => handleRemoveSubTask(index)} />
        </View>
      ))}
      <View style={styles.addSubTaskContainer}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          value={newSubTask}
          onChangeText={setNewSubTask}
          placeholder="Enter sub-task"
        />
        <Button title="Add Sub-Task" onPress={handleAddSubTask} />
      </View>
      <Text style={styles.label}>Add Image</Text>
      <Button title="Pick an image from gallery" onPress={handlePickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      <Text style={styles.label}>Select Date and Time</Text>
      <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      <DateTimePicker value={date} mode="time" display="default" onChange={handleDateChange} />
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Enter your notes"
        multiline
      />
      <Button title="Save Habit" onPress={handleSaveHabit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  subTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  subTask: {
    fontSize: 16,
    flex: 1,
  },
  addSubTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  imageText: {
    fontSize: 16,
    color: 'green',
    marginVertical: 8,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
});

export default HabitEdit;
