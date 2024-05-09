const QuizData = () => {
  const questions = [
    {
      id: 1,
      question: "What percentage of men worldwide smoke cigarettes?",
      options: ["25%", "35%", "45%", "55%"],
      correctAnswer: "35%"
    },
    {
      id: 2,
      question: "What percentage of men are overweight or obese globally?",
      options: ["30%", "40%", "50%", "60%"],
      correctAnswer: "40%"
    },
    {
      id: 3,
      question: "What is the recommended daily intake of fiber for adult men to promote digestive health?",
      options: ["10 grams", "20 grams", "30 grams", "40 grams"],
      correctAnswer: "30 grams"
    },
    {
      id: 4,
      question: "What are some common symptoms of male depression?",
      options: ["Feelings of sadness or hopelessness", "Loss of interest in hobbies", "Fatigue or decreased energy", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      id: 5,
      question: "What is the recommended amount of physical activity for adult men per week according to health guidelines?",
      options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
      correctAnswer: "120 minutes"
    },
  ];

  return questions;
};

export default QuizData;
