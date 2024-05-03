const QuizData = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "What is the capital of Ireland?",
      options: ["Cork", "Dublin", "Galway", "Meath"],
      correctAnswer: "Dublin"
    },
    {
      question: "Whats my favourite position?",
      options: ["Centre back", "Striker", "Texas Oil Rig", "Goalkeeper"],
      correctAnswer: "Goalkeeper"
    },
    // Add more questions as needed
  ];

  return questions;
};

export default QuizData;
