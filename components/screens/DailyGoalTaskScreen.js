import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";

import React, { useContext, useState } from "react";
import DailyGoalsContext from "../home/DailyGoalsContext";
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const tasksByCategory = {
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
  Test: [{ name: "Test", description: "Description for the test task" }],
};

export default function DailyGoalsTasksScreen() {
  const { addGoal } = useContext(DailyGoalsContext);
  const [title, setTitle] = useState("Physical Activities");
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleAddGoal = () => {
    const max = selectedTasks.length; 
    addGoal({ title, current: 0, max });
  };

  const toggleTask = (task) => {
    setSelectedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0C0F14", flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
          Choose Your Goal
        </Text>
        <Picker
          selectedValue={title}
          onValueChange={(itemValue) => {
            setTitle(itemValue);
            setSelectedTasks([]);
          }}
          style={styles.picker}
          itemStyle={{ color: "white", fontSize: 16 }}
        >
          {Object.keys(tasksByCategory).map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
        <ScrollView style={{ flex: 1, marginBottom: 20}}>
          {tasksByCategory[title].map((task) => (
            <Pressable
              key={task.name}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
                styles.taskItem,
              ]}
              onPress={() => toggleTask(task.name)}
            >
              <View style={{ flexDirection: "row", alignItems: "center"}}>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor: selectedTasks.includes(task.name)
                        ? "#D17842"
                        : "transparent",
                    },
                  ]}
                />
                <View style={{ flexDirection: "column", marginLeft: 10}}>
                  <Text style={styles.taskText}>{task.name}</Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <View style={{justifyContent: "center", alignItems: "center", paddingBottom: 10}}>
          <Pressable style={styles.button} onPress={handleAddGoal}>
            <Text style={styles.textGoal}>Add Goal</Text>
          </Pressable>
        </View>
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
  picker: {
    color: "white",
    borderRadius: 30,
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
  pickerItem: {
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
    backgroundColor: "#DC3535",
  },
  textGoal: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
