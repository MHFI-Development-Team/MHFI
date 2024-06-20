import { Link } from 'expo-router';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

export type DailyGoalsTask = {
  task: string;
  maxtaskcount: number;
  image: string;
};

export type SuggestedTool = {
  image?: string;
  SvgComponent?: FC<SvgProps>;
  name: string;
  link: typeof Link;
  href: string;
};

export type ContentForYou = {
  image: string;
  name: string;
  link: typeof Link;
};

export type Article = {
  title: string;
  id: string;
  content: string;
  thumbnail?: string;
  tags?: string[] | null;
};
