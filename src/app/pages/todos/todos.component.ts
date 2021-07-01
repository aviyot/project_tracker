import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Timestamp } from '@firebase/firestore-types';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';
import { TODO_STATUS } from 'src/types/todo_status.type';
import { IsTimestampService } from 'src/app/services/is-timestamp.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  @Input() selectedProject: any;
  @Input() docRef;
  todoState: FormState;

  doneHided = true;
  selectedStatus: TODO_STATUS | 'ALL' = 'IN_PROGRESS';

  constructor(private timestampServ: IsTimestampService) {}

  ngOnInit(): void {
    this.todoState = { add: false, edit: false, selectedIndex: null };
  }

  addTodo() {
    this.todoState.add = !this.todoState.add;
  }

  checkDate(date: any): boolean {
    return this.timestampServ.isTimestamp(date);
  }
  editTodo(todoIndex) {
    if (this.todoState.selectedIndex !== todoIndex) this.todoState.edit = true;
    else this.todoState.edit = !this.todoState.edit;

    this.todoState.selectedIndex = todoIndex;
  }

  deleteTodo(todo) {
    this.docRef.update({
      todos: firebase.firestore.FieldValue.arrayRemove(todo),
    });
  }

  hideDone() {
    this.doneHided = !this.doneHided;
  }

  removeLink(todo, index) {
    this.docRef
      .update({
        todos: firebase.firestore.FieldValue.arrayRemove(todo),
      })
      .then(() => {
        todo.links.splice(index, 1);
        this.docRef.update({
          todos: firebase.firestore.FieldValue.arrayUnion(todo),
        });
      });
  }
}
