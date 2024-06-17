import { Link } from 'expo-router';
import { SuggestedTool } from '@/constants/types';
import AlchololIcon from '@/assets/svg/SuggestToolSVG/alchololIcon';
import BmiIcon from '@/assets/svg/SuggestToolSVG/bmiIcon';
import QuizIcon from '@/assets/svg/SuggestToolSVG/QuizIcon';
import SmokingIcon from '@/assets/svg/SuggestToolSVG/smokingIcon';
import SignIcon from '@/assets/svg/SuggestToolSVG/signIcon';
import GeoIcon from '@/assets/svg/SuggestToolSVG/geoIcon';

const suggestedTools: SuggestedTool[] = [
  {
    image: '',
    SvgComponent: BmiIcon,
    name: 'BMI Calculator',
    link: Link,
    href: '/bmiScreen',
  },
  {
    image: '',
    SvgComponent: GeoIcon,
    name: 'Geolocator',
    link: Link,
    href: '/geoLocatorScreen',
  },
  {
    image: '',
    SvgComponent: AlchololIcon,
    name: 'Alcohol Calculator',
    link: Link,
    href: '/alcoholScreen',
  },
  {
    image: '',
    SvgComponent: SmokingIcon,
    name: 'Smoking Calculator',
    link: Link,
    href: '/smokingScreen',
  },
  {
    image: '',
    SvgComponent: QuizIcon,
    name: 'Quiz',
    link: Link,
    href: '/quizScreen',
  },
  {
    image: '',
    SvgComponent: SignIcon,
    name: 'Sign Posting',
    link: Link,
    href: '/signPosting',
  },
];
export default suggestedTools;
