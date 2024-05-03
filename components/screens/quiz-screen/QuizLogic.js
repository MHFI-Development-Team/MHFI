import React, { useState } from 'react';
import QuizData from './QuizData'; // Import QuizData

const QuizLogic = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to hold the selected question
  const [nextQuestion, setNextQuestion] = useState(null); // State to hold the selected question
  const [score, setScore] = useState(0);

  const selectRandomQuestion = () => {
    if (!selectedQuestion || nextQuestion) {
      const questions = QuizData(); // Call the QuizData function to get the questions array
      let remainingQuestions = questions.filter(question => question !== selectedQuestion); // Filter out the already asked questions
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const randomQuestion = remainingQuestions[randomIndex];
      setSelectedQuestion(randomQuestion);
      setNextQuestion(false); // Reset movedToNextQuestion state
      return randomQuestion;
    }
    return selectedQuestion;
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (optionIndex) => {
    setSelectedOption(optionIndex);
  
  };

  const handleNextQuestion = () => {
    setNextQuestion(true); // Set movedToNextQuestion to true when next question is pressed
    const currentQuestion = selectRandomQuestion();

    if (selectedOption !== null && currentQuestion.correctAnswer === currentQuestion.options[selectedOption]) {
      // Increase score if the selected option is correct and next question is pressed
      setScore(score + 1);
    }

    setSelectedOption(null); // Reset selectedOption
  };

  return { selectedOption, handleOptionPress, handleNextQuestion, selectRandomQuestion, score };
};

export default QuizLogic;
