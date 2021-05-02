import { Question } from './question.model';
import { PROGRESS } from '../types/progress.type';

export interface Feature {
  name: string;
  desc: string;
  isStart?: boolean;
  isEnd?: boolean;
  questions?: Question[];
  progress: PROGRESS;
}
