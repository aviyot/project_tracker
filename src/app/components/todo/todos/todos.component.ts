import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';
import { TODO_STATUS } from 'src/types/todo_status.type';
import { IsTimestampService } from 'src/app/services/is-timestamp.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormAction } from 'src/types/form-action.type';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  @Input() selectedProject: any;
  @Input() docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  todoState: FormState;
  todos = new Observable<any[]>();

  doneHided = true;
  selectedStatus: TODO_STATUS | 'ALL' = 'IN_PROGRESS';

  constructor(private timestampServ: IsTimestampService) {}

  ngOnInit(): void {
    this.todoState = { add: false, edit: false, selectedIndex: null };
    this.todos = this.docRef
      .collection('todos', (ref) => ref.orderBy('date', 'desc'))
      .valueChanges({ idField: 'id' }) as Observable<Project[]>;
    this.todos.subscribe((d) => {});
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

  deleteTodo(todoId) {
    this.docRef.collection('todos').doc(todoId).delete();
  }

  hideDone() {
    this.doneHided = !this.doneHided;
  }

  onFormAction(action: FormAction) {
    if (action == 'ADD') {
      this.todoState = { ...this.todoState, add: false };
    }
    if (action == 'SAVE') {
      this.todoState = { ...this.todoState, edit: false };
    }
  }
}
