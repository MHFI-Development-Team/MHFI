import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView
} from "react-native";
import DailyGoalsContext from "../home/DailyGoalsContext";

const TaskItem = ({ task, onSelect, isSelected }) => {
  return (
    <Pressable
      key={task}
      onPress={() => onSelect(task)}
      style={({ pressed }) => [styles.taskItem, { opacity: pressed ? 0.5 : 1 }]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={[
            styles.circle,
            { backgroundColor: isSelected ? "#D17842" : "transparent" },
          ]}
        />
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={styles.taskText}>{task}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default GoalManagementScreen = ({ route, navigation }) => {
  const { goalIndex } = route.params;
  const { goals, editGoal, deleteGoal } = useContext(DailyGoalsContext);

  const currentGoal = goals[goalIndex];
  const completedTasks = currentGoal?.completedTasks || [];
  const [selectedTasks, setSelectedTasks] = useState([...completedTasks]);

  const handleSave = () => {
    currentGoal.completedTasks = selectedTasks;
    editGoal(goalIndex, currentGoal);

    navigation.goBack();
  };

  const handleDelete = () => {
    deleteGoal(goalIndex);
    navigation.goBack();
  };

  const toggleTask = (taskName) => {
    setSelectedTasks((prev) =>
      prev.includes(taskName)
        ? prev.filter((name) => name !== taskName)
        : [...prev, taskName]
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0C0F14", flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            paddingTop: 15,
            paddingBottom: 15,
            fontSize: 20,
          }}
        >
          {currentGoal?.title}
        </Text>
        {currentGoal?.totalTasks.map((task, idx) => (
            <TaskItem
              key={`${task}${idx}`}
              task={task}
              onSelect={toggleTask}
              isSelected={selectedTasks.includes(task)}
            />
        ))}
        <View style={{ marginTop: 15, gap: 15 }}>
          <Button title="Save Changes" onPress={handleSave} />
          <Button title="Delete Goal" onPress={handleDelete} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    backgroundColor: "#DC3535",
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
