import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import drugsQuestions from '@/components/Quiz/drugsQuestions';
import smokingQuestions from '@/components/Quiz/smokingQuestions';
import drinkingQuestions from '@/components/Quiz/drinkingQuestions';
import { Question } from '@/components/Quiz/IQuizQuestion';
import { Colors } from '@/constants/Colors';

import * as Haptics from 'expo-haptics';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const questions: { [key: string]: Question[] } = {
  Smoking: smokingQuestions,
  Drinking: drinkingQuestions,
  Drugs: drugsQuestions,
};

const QuizData: React.FC = () => {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { question: string; answer: string; correctAnswer: string }[]
  >([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (!category || !questions[category]) {
      console.error('Invalid category or no questions available for this category');
    }
  }, [category]);

  if (!category || !questions[category]) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Invalid category</Text>
      </View>
    );
  }

  const currentQuestion = questions[category][questionIndex];

  const handleAnswer = (answer: string) => {
    setSelectedAnswers([
      ...selectedAnswers,
      { question: currentQuestion.question, answer, correctAnswer: currentQuestion.correctAnswer },
    ]);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    if (questionIndex < questions[category].length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const renderOptions = () => {
    return currentQuestion.options.map((option: string, index: number) => (
      <TouchableOpacity
        key={index}
        style={styles.optionButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          handleAnswer(option);
        }}>
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const renderResults = () => {
    return selectedAnswers.map((result, index) => (
      <View key={index} style={styles.result}>
        <Text style={styles.resultQuestion}>{result.question}</Text>
        <Text
          style={
            result.answer === result.correctAnswer ? styles.correctAnswer : styles.wrongAnswer
          }>
          Your Answer: {result.answer}
        </Text>
        {result.answer !== result.correctAnswer && (
          <Text style={styles.correctAnswer}>Correct Answer: {result.correctAnswer}</Text>
        )}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {quizCompleted ? (
          <>
            <Text style={styles.title}>Quiz Completed</Text>
            <Text style={styles.score}>
              Your Score: {score} / {questions[category].length}
            </Text>
            {renderResults()}
          </>
        ) : (
          <>
            <Text style={styles.title}>{category} Quiz</Text>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            {renderOptions()}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flexGrow: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  question: {
    fontSize: windowWidth * 0.02,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  optionButton: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: Colors.ButtonColor,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  score: {
    fontSize: 24,
    marginVertical: 20,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  result: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    width: '100%',
  },
  resultQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  correctAnswer: {
    color: 'green',
    fontSize: 16,
  },
  wrongAnswer: {
    color: 'red',
    fontSize: 16,
  },
});

export default QuizData;
