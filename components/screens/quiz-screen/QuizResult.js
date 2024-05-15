import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Button } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const screenWidth = Dimensions.get("window").width;

const QuizResult = ({ route }) => {
  const { score, totalQuestions } = route.params;
  const navigation = useNavigation(); // Initialize navigation object
  
  const handleExitPress = () => {
    // Navigate to the Home screen
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Result</Text>
        <View style={styles.resultCircle}>
          <Text style={styles.bmiValue}>{score}/{totalQuestions}</Text>
        </View>
        <View style={styles.returnHome}>
          <TouchableOpacity style={styles.exitBtn} onPress={handleExitPress}>
            <Text style={{ color: 'white' }}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#171621', 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', 
    marginBottom: 30,
  },
  resultCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#6A1B9A',  
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, 
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF', 
  },
  returnHome: {
    flexDirection: 'row',
  },
  exitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: screenWidth * 0.25,
    backgroundColor: '#FF922E',
    borderRadius: 30,
    alignSelf: 'center', 
    marginTop: 20
  },
});

export default QuizResult;