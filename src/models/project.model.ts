import { tool } from './tool.model';
import { Feature } from './feature.model';
import { Question } from './question.model';
import { LIFECYCLE_STAGE } from '../types/lifecycleStage.type';

export interface Project {
  name: string;
  desc: string;
  startTime: string;
  lifecycleStage: LIFECYCLE_STAGE;
  endTime?: string;
  tools?: tool[];
  features?: Feature[];
  questions?: Question[];
}
