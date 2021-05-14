import { PROGRESS } from '../types/progress.type';

export interface Feature {
  name: string;
  desc: string;
  startDate?: boolean;
  endDate?: boolean;
  progress: PROGRESS;
}
