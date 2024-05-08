const QuizData = () => {
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "What is the capital of Ireland?",
      options: ["Cork", "Dublin", "Galway", "Meath"],
      correctAnswer: "Dublin"
    },
    {
      id: 3,
      question: "What's my favorite football position?",
      options: ["Centre back", "Striker", "Midfield", "Goalkeeper"],
      correctAnswer: "Goalkeeper"
    },
    // Add more questions as needed
  ];

  return questions;
};

export default QuizData;
