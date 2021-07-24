import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { TODO_STATUS } from 'src/types/todo_status.type';
import { IsTimestampService } from 'src/app/services/is-timestamp.service';
import { FormAction } from 'src/types/form-action.type';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  @Input('todo') todoData: Todo | null | any;
  @Input('docRef')
  docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  @Output() formAction: EventEmitter<FormAction> = new EventEmitter();
  todo: FormGroup;
  status: TODO_STATUS[] = [
    'PLANNED',
    'IN_PROGRESS',
    'NOT_NEEDED',
    'STUCK',
    'COMPLETED',
    'STOPED',
  ];
  constructor(
    private fb: FormBuilder,
    private timestampServ: IsTimestampService
  ) {}

  ngOnInit(): void {
    this.todo = this.fb.group({
      title: [''],
      detail: ['', Validators.required],
      date: [new Date()],
      status: [this.status[0]],
      gitCommit: [''],
      makingDesc: [''],
      completeDate: [null],
    });

    if (this.todoData) {
      this.todo.patchValue(this.todoData);
      if (this.timestampServ.isTimestamp(this.todoData.date)) {
        this.todo.patchValue({ date: this.todoData.date.toDate() });
      }
      if (this.timestampServ.isTimestamp(this.todoData.completeDate)) {
        this.todo.patchValue({
          completeDate: this.todoData.completeDate.toDate(),
        });
      }
    }
  }

  addTodo() {
    if (this.todo.valid) {
      this.docRef
        .collection('todos')
        .add(this.todo.value)
        .then(() => {
          this.todo.reset({ date: new Date(), status: this.status[0] });
          this.formAction.emit('ADD');
        });
    }
  }

  saveTodo() {
    if (this.todo.valid) {
      this.docRef
        .collection('todos')
        .doc(this.todoData.id)
        .update(this.todo.value)
        .then(() => {
          this.todo.reset({ date: new Date(), status: this.status[0] });
          this.formAction.emit('SAVE');
        });
    }
  }
}
