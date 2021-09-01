/*
 projectDesc: ProjectDesc;
  tools?: Tool[];
  features?: Feature[];
  questions?: QuestionAnswer[];
  todos?: Todo[];
  workTimes?: WorkTime[];
  challenges?: Challenge[]; 
 */
export type ProjectSection =
  | 'projectDesc'
  | 'tools'
  | 'features'
  | 'questions'
  | 'todos'
  | 'workTimes'
  | 'challenges'
  | 'howTodos';
