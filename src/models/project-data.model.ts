import { Tool } from './tool.model';
import { Feature } from './feature.model';
import {QuestionAnswer} from "./question-answer.model"
import { LIFECYCLE_STAGE } from '../types/lifecycleStage.type';
import { WorkTime } from './work-time.model';

export interface ProjectData {
  name: string;
  desc: string;
  startTime: string;
  endTime?: string;
  lifecycleStage: LIFECYCLE_STAGE;
  gitHub?:string;
  site?:string;
  tools?: Tool[];
  features?: Feature[];
  questions?: QuestionAnswer[];
  workTimes?:WorkTime[];
}
