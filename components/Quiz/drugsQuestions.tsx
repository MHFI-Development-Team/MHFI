import { Question } from './Interface';

const drugsQuestions: Question[] = [
  {
    question: 'What percentage of people have used illegal drugs at least once?',
    options: ['5%', '10%', '15%', '20%'],
    correctAnswer: '10%',
  },
  {
    question: 'Which is the most commonly used illegal drug?',
    options: ['Cocaine', 'Heroin', 'Marijuana', 'Ecstasy'],
    correctAnswer: 'Marijuana',
  },
  {
    question: 'Which age group has the highest rate of drug use?',
    options: ['15-24 years', '25-34 years', '35-44 years', '45-54 years'],
    correctAnswer: '15-24 years',
  },
  {
    question: 'Which country has the highest rate of drug use?',
    options: ['United States', 'Canada', 'Mexico', 'Brazil'],
    correctAnswer: 'United States',
  },
  {
    question: 'What percentage of drug users are seeking treatment?',
    options: ['10%', '20%', '30%', '40%'],
    correctAnswer: '20%',
  },
];

export default drugsQuestions;
