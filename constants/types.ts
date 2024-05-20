import { Link } from 'expo-router';

export type DailyGoalsTask = {
  task: string;
  maxtaskcount: number;
  image: string;
};

export type SuggestedTool = {
  image: string;
  name: string;
  link: typeof Link;
};

export type ContentForYou = {
  image: string;
  name: string;
  link: typeof Link;
};
