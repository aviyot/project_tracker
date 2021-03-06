import { Tool } from './tool.model';
import { Feature } from './feature.model';
import { QuestionAnswer } from './question-answer.model';
import { LIFECYCLE_STAGE } from '../types/lifecycleStage.type';
import { Todo } from './todo.model';
import { WorkTime } from './work-time.model';
import { ProjectDesc } from './project-desc.model';
import { Challenge } from './challenge.model';

export interface ProjectData {
  projectDesc: ProjectDesc;
  tools?: Tool[];
  features?: Feature[];
  questions?: QuestionAnswer[];
  todos?: Todo[];
  workTimes?: WorkTime[];
  challenges?: Challenge[];
}
