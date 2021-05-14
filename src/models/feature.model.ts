import { PROGRESS } from '../types/progress.type';
import {Question} from "./question.model"

export interface Feature {
  name: string;
  desc: string;
  isStart?: boolean;
  isEnd?: boolean;
  progress: PROGRESS;
  questions?: Question[];
}
