import { TODO_STATUS } from "src/types/todo_status.type";

export interface Todo {
   title:string
   detail:string;
   date:string;
   status:TODO_STATUS;
}