import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const QuizUI = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#171621', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={{ color: 'white', fontSize: 32 }}>Placeholder</Text>
        </View>
        <View style={styles.answerContainer}>
          <TouchableOpacity style={styles.answerBtn}>
            <Text style={{ color: 'white' }}>Answer 1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.answerBtn}>
            <Text style={{ color: 'white' }}>Answer 2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.answerBtn}>
            <Text style={{ color: 'white' }}>Answer 3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.answerBtn}>
            <Text style={{ color: 'white' }}>Answer 4</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    paddingHorizontal: screenWidth * 0.05,
  },
  questionContainer: {
    flex: 1, // Take up space above the answers
    justifyContent: 'center', // Center items vertically
  },
  answerContainer: {
    flex: 1, // Take up space below the question
    alignItems: 'center', // Center items horizontally
    justifyContent: 'flex-start', // Align items to the top
    marginTop: 20, // Add some spacing between question and answers
  },
  answerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 300,
    backgroundColor: '#303345',
    borderRadius: 15,
    marginBottom: 20,
  },
});
