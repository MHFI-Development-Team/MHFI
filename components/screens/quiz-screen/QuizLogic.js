import QuizData from './QuizData';

const QuizLogic = {
  selectRandomQuestion: () => {
    const questions = QuizData(); // Call the QuizData function to get the questions array
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  },
  // You can add more functions for managing the quiz logic here
};

export default QuizLogic;
