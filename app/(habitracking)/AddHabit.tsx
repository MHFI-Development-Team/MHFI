import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const AddHabit: React.FC = () => {
  const [habitName, setHabitName] = useState('');
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [newSubTask, setNewSubTask] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState('');
  const router = useRouter();

  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([...subTasks, newSubTask]);
      setNewSubTask('');
    }
  };

  const handleSaveHabit = async () => {
    if (habitName.trim() === '') {
      Alert.alert('Error', 'Habit name cannot be empty');
      return;
    }

    const newHabit = {
      id: generateId(),
      habitName,
      subTasks: subTasks.map(subTask => ({ id: generateId(), name: subTask })),
      imageUri,
      date: date.toISOString(),
      notes,
    };

    try {
      const existingHabits = await AsyncStorage.getItem('habits');
      const habits = existingHabits ? JSON.parse(existingHabits) : [];
      await AsyncStorage.setItem('habits', JSON.stringify([...habits, newHabit]));
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
    setShowDatePicker(false);
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
        <Text key={index} style={styles.subTask}>
          {subTask}
        </Text>
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
      {imageUri && <Text style={styles.imageText}>Image selected</Text>}
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
  subTask: {
    fontSize: 16,
    marginVertical: 4,
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

export default AddHabit;
