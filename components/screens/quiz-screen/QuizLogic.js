import React, { useState, useEffect } from 'react';
import QuizData from './QuizData'; 
import { useNavigation } from '@react-navigation/native'; 

const QuizLogic = () => {
  const navigation = useNavigation();

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const totalQuestions = QuizData().length;
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    selectRandomQuestion();
  }, []);

  useEffect(() => {
    console.log("Updated Score:", score); // Log the updated score
    if (finalScore !== null) {
      console.log("Final Score:", finalScore); // Log the final score before navigating
      navigation.navigate('QuizResult', { score: score, totalQuestions: totalQuestions });
    }
  }, [score, finalScore]); // Log the score whenever it changes

  const selectRandomQuestion = () => {
    const questions = QuizData();
    let remainingQuestions = questions.filter(question => !askedQuestions.includes(question.id));
    if (remainingQuestions.length === 0) {
      setFinalScore(score); // Set the final score
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const randomQuestion = remainingQuestions[randomIndex];
    setSelectedQuestion(randomQuestion);
    setAskedQuestions([...askedQuestions, randomQuestion.id]);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    const currentQuestion = selectedQuestion;
    if (selectedOption !== null && currentQuestion.options[selectedOption] === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    selectRandomQuestion();
  };
  
  return { selectedOption, handleOptionPress, handleNextQuestion, selectedQuestion };
};

export default QuizLogic;