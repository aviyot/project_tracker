import { tool } from './tool.model';
import { Feature } from './feature.model';
import {Question} from "./question.model"
import { LIFECYCLE_STAGE } from '../types/lifecycleStage.type';

export interface Project {
  name: string;
  desc: string;
  startTime: string;
  endTime?: string;
  lifecycleStage: LIFECYCLE_STAGE
  tools?: tool[];
  gitHub?:string;
  features?: Feature[];
  questions?: Question[];
}
