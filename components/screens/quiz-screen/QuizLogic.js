import React, { useState, useEffect } from 'react';
import QuizData from './QuizData'; // Assuming QuizData contains your question data
import { useNavigation } from '@react-navigation/native'; 

const QuizLogic = () => {
  const navigation = useNavigation();

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const totalQuestions = QuizData().length;
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    selectRandomQuestion();
  }, []);

  const selectRandomQuestion = () => {
    const questions = QuizData();
    let remainingQuestions = questions.filter(question => !askedQuestions.includes(question.id)); // Change to compare IDs
    if (remainingQuestions.length === 0) {
      // Navigate to QuizResult page if all questions are answered
      console.log("Final Score:", score); // Log the final score before navigating
      navigation.navigate('QuizResult', { score: score, totalQuestions: totalQuestions });
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const randomQuestion = remainingQuestions[randomIndex];
    setSelectedQuestion(randomQuestion);
    setAskedQuestions([...askedQuestions, randomQuestion.id]); // Store IDs instead of objects
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    const currentQuestion = selectedQuestion;
    console.log("Current Question:", currentQuestion);
    console.log("Selected Option:", selectedOption);
    if (selectedOption !== null && currentQuestion.correctAnswer === currentQuestion.options[selectedOption]) {
      console.log("Answer is correct!");
      setScore(score + 1);
      console.log("Updated Score:", score);
    } else {
      console.log("Answer is incorrect or no option selected!");
    }
    setSelectedOption(null);
    selectRandomQuestion(); // Call selectRandomQuestion to get the next question
  };
  

  return { selectedOption, handleOptionPress, handleNextQuestion, selectedQuestion };
};

export default QuizLogic;