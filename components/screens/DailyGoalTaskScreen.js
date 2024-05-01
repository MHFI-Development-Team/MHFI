import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";

import React, { useContext, useState, useMemo} from "react";
import DailyGoalsContext from "../home/DailyGoalsContext";
import { Dropdown } from "react-native-element-dropdown";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const tasksByCategory = {
  "Physical Activities": [
    {
      name: "Cardiovascular Exercise",
      description: "30 Minutes of walking, jogging, or cycling",
    },
    {
      name: "Strength Training",
      description: "30 Minutes of weightlifting or bodyweight exercises",
    },
    {
      name: "Flexibility Exercises",
      description: "15 Minutes of stretching exercises",
    },
    {
      name: "Sports or Recreational Activities",
      description: "Playing a sport or engaging in recreational activities",
    },
    {
      name: "Outdoor Activities",
      description: "Outdoor activities such as hiking, swimming, or kayaking",
    },
    {
      name: "Dance or Aerobics",
      description: "30 Minutes of dancing or aerobics exercises",
    },
  ],
  "Test Activity": [
    {
      name: "Test",
      description: "Test Test Test Test Test",
    }
  ],
};

const TaskItem = ({ task, onSelect, isSelected }) => {
  return (
    <Pressable
      key={task.name}
      onPress={() => onSelect(task.name)}
      style={({ pressed }) => [
        styles.taskItem,
        { opacity: pressed ? 0.5 : 1 }
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={[
            styles.circle,
            { backgroundColor: isSelected ? '#D17842' : 'transparent' }
          ]}
        />
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text style={styles.taskText}>{task.name}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function DailyGoalsTasksScreen() {
  const { addGoal, goals } = useContext(DailyGoalsContext);
  const [title, setTitle] = useState('Physical Activities');
  const [selectedTasks, setSelectedTasks] = useState([]);
  
  const data = useMemo(() => Object.keys(tasksByCategory)
    .filter(key => !goals.some(goal => goal.title === key))
    .map(key => ({ label: key, value: key })), [goals]);

  const handleAddGoal = async () => {
    const newGoal = {
      title: title,
      totalTasks: selectedTasks,
      completedTasks: []
    };

    if (!goals.some(goal => goal.title === title)) {
      await addGoal(newGoal);
    } else {
      alert('A goal with this title already exists!');
    }
  };

  const toggleTask = (taskName) => {
    setSelectedTasks((prev) =>
      prev.includes(taskName)
        ? prev.filter((name) => name !== taskName)
        : [...prev, taskName]
    );
  };

  const availableTasks = useMemo(() => goals.some(goal => goal.title === title) ? [] : tasksByCategory[title], [goals, title]);

  return (
    <SafeAreaView style={{ backgroundColor: '#171621', flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
          Choose Your Goal
        </Text>
        <Dropdown
          data={data}
          labelField='label'
          valueField='value'
          value={title}
          onChange={(item) => {
            setTitle(item.value);
            setSelectedTasks([]);
          }}
          style={styles.dropdown}
          selectedTextStyle={styles.selectedText}
          placeholderStyle={styles.placeholderText}
        />
        <View>
          {availableTasks.map(task => (
            <TaskItem
              key={task.name}
              task={task}
              onSelect={toggleTask}
              isSelected={selectedTasks.includes(task.name)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: data.length === 0 ? '#B8B8B8' : '#FF922E' }]}
          onPress={handleAddGoal}
          disabled={data.length === 0}
        >
          <Text style={styles.textGoal}>Add Goal</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: screenWidth * 0.05,
    paddingRight: screenWidth * 0.05,
    flex: 1,
    paddingTop: 25,
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  selectedText: {
    fontSize: 16,
    color: "black",
  },
  placeholderText: {
    fontSize: 16,
    color: "#B8B8B8",
  },
  taskItem: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  taskText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  taskDescription: {
    color: "#B8B8B8",
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D17842",
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: "#FF922E",
  },
  textGoal: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonContainer: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
