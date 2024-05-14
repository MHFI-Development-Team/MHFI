import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import QuizLogic from './QuizLogic';
import BackIcon from '../../../assets/svg/backIcon';

const screenWidth = Dimensions.get("window").width;

const QuizUI = () => {
  const { selectedOption, handleOptionPress, handleNextQuestion, selectedQuestion} = QuizLogic();
 
  
  if (!selectedQuestion) {
    return null; // Return null or a loading indicator while waiting for a question to be selected
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#171621', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={{ color: 'white', fontSize: 32 }}>{selectedQuestion.question}</Text>
        </View>
        <View style={styles.answerContainer}>
          {selectedQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.answerBtn, selectedOption === index && styles.selectedBtn]}
              onPress={() => handleOptionPress(index)}
            >
              <Text style={{ color: 'white' }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.nextQuestion}>
        {selectedOption !== null && ( // Display the "Next Question" button only if an option has been selected
          <View style={styles.nextQuestion}>
            <TouchableOpacity onPress={handleNextQuestion}>
              <BackIcon/>
            </TouchableOpacity>
          </View>
        )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizUI;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    flex: 0.5, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  }, 
  answerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width:  screenWidth - 50,
    backgroundColor: '#303345',
    borderRadius: 15,
    marginBottom: 20,
  },
  selectedBtn: {
    backgroundColor: '#FF922E', 
  },
  nextQuestion:{
    position: 'absolute',
    bottom: 10,
    right: 20,
  }
});