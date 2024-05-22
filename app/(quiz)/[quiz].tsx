import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import drugsQuestions from '@/components/Quiz/drugsQuestions';
import smokingQuestions from '@/components/Quiz/smokingQuestions';
import drinkingQuestions from '@/components/Quiz/drinkingQuestions';
import { Question } from '@/components/Quiz/Interface';

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
        onPress={() => handleAnswer(option)}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  optionText: {
    fontSize: 16,
  },
  score: {
    fontSize: 22,
    marginVertical: 20,
  },
  result: {
    marginBottom: 10,
  },
  resultQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctAnswer: {
    color: 'green',
  },
  wrongAnswer: {
    color: 'red',
  },
});

export default QuizData;
