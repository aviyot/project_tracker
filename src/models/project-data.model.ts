import { Tool } from './tool.model';
import { Feature } from './feature.model';
import {QuestionAnswer} from "./question-answer.model"
import { LIFECYCLE_STAGE } from '../types/lifecycleStage.type';
import { Todo } from './todo';
import { WorkTime } from './work-time.model';
import { ProjectDescription } from './project-description';

export interface ProjectData {
  projectDesc:ProjectDescription
  tools?: Tool[];
  features?: Feature[];
  questions?: QuestionAnswer[];
  todos?:Todo[];
  workTimes?:WorkTime[];
}
