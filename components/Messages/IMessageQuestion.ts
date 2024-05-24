export interface Answer {
  text: string;
  next: number | null;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}
