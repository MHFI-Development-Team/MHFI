import { Question } from './Interface';

const drinkingQuestions: Question[] = [
  {
    question: 'What percentage of adults worldwide drink alcohol?',
    options: ['40%', '50%', '60%', '70%'],
    correctAnswer: '50%',
  },
  {
    question: 'How many liters of pure alcohol are consumed per capita annually?',
    options: ['3 liters', '5 liters', '7 liters', '9 liters'],
    correctAnswer: '5 liters',
  },
  {
    question: 'Which country consumes the most alcohol per capita?',
    options: ['Russia', 'Germany', 'United States', 'France'],
    correctAnswer: 'Russia',
  },
  {
    question: 'What is the most popular alcoholic beverage in the world?',
    options: ['Beer', 'Wine', 'Whiskey', 'Vodka'],
    correctAnswer: 'Beer',
  },
  {
    question: 'What percentage of alcohol consumption is attributed to binge drinking?',
    options: ['10%', '25%', '40%', '60%'],
    correctAnswer: '25%',
  },
];

export default drinkingQuestions;
