import { Link } from 'expo-router';

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
};

export type ContentForYou = {
  image: string;
  name: string;
  link: typeof Link;
};
