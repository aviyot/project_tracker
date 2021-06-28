import { TODO_STATUS } from 'src/types/todo_status.type';

export interface Todo {
  title: string;
  detail: string;
  date: Date;
  status: TODO_STATUS;
  gitCommit: string;
  makingDesc: string;
  completeDate: Date;
}
