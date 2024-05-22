import { Question } from './Interface';

const smokingQuestions: Question[] = [
  {
    question: 'What percentage of men worldwide smoke cigarettes?',
    options: ['25%', '35%', '45%', '55%'],
    correctAnswer: '35%',
  },
  {
    question: 'How many cigarettes are smoked worldwide each year?',
    options: ['5 billion', '50 billion', '500 billion', '5 trillion'],
    correctAnswer: '5 trillion',
  },
  {
    question: 'What is the most common age group for starting smoking?',
    options: ['10-15 years', '15-20 years', '20-25 years', '25-30 years'],
    correctAnswer: '15-20 years',
  },
  {
    question: 'Which country has the highest percentage of smokers?',
    options: ['China', 'India', 'Russia', 'United States'],
    correctAnswer: 'China',
  },
  {
    question: 'What percentage of smokers want to quit?',
    options: ['30%', '50%', '70%', '90%'],
    correctAnswer: '70%',
  },
];

export default smokingQuestions;
