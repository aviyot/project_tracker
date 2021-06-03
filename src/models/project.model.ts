import { tool } from './tool.model';
import { Feature } from './feature.model';
import {QuestionAnswer} from "./question-answer.model"
import { LIFECYCLE_STAGE } from '../types/lifecycleStage.type';
import { ProjectData } from './project-data.model';

export interface Project extends ProjectData {
  id:string;
}
