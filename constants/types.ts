import { Link } from 'expo-router';
import { SvgProps } from 'react-native-svg';

export type DailyGoalsTask = {
  task: string;
  maxtaskcount: number;
  image: string;
};

export type SuggestedTool = {
  [x: string]: FC<SvgProps> | undefined;
  image: string;
  name: string;
  link: typeof Link;
  href: string;
};

export type ContentForYou = {
  image: string;
  name: string;
  link: typeof Link;
};
