import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Timestamp } from '@firebase/firestore-types';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';
import { TODO_STATUS } from 'src/types/todo_status.type';
import { IsTimestampService } from 'src/app/services/is-timestamp.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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

  constructor(
    private timestampServ: IsTimestampService,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

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
    this.docRef
      .collection('todos')
      .doc(todoId)
      .delete()
      .then(() => {
        console.log('data deleted');
      });
  }

  hideDone() {
    this.doneHided = !this.doneHided;
  }
}
