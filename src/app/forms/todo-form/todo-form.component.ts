import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { TODO_STATUS } from 'src/types/todo_status.type';
import { IsTimestampService } from 'src/app/services/is-timestamp.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  @Input('todo') todoData: Todo | null | any;
  @Input('docRef')
  docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  todo: FormGroup;
  linkForm: FormGroup;
  openLinkform = false;
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
      links: this.fb.array([]),
    });

    this.linkForm = this.fb.group({
      title: ['', Validators.required],
      href: ['', Validators.required],
      site: [''],
      problemDesc: [''],
    });
    if (this.todoData) {
      this.todo.patchValue(this.todoData);
      const linksArray = this.todo.get('links') as FormArray;
      this.todoData.links.forEach((link) => {
        this.linkForm.patchValue(link);
        linksArray.push(this.linkForm);
      });
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
      if (this.linkForm.valid) {
        const linksArray = this.todo.get('links') as FormArray;
        linksArray.push(this.linkForm);
        this.linkForm.reset();
      }
      this.docRef
        .update({
          todos: firebase.firestore.FieldValue.arrayUnion(this.todo.value),
        })
        .then(() => {
          this.todo.reset({ date: new Date(), status: this.status[0] });
        });
    }
  }

  saveTodo() {
    if (this.todo.valid) {
      if (this.linkForm.valid) {
        const linksArray = this.todo.get('links') as FormArray;
        linksArray.push(this.linkForm);
        this.linkForm.reset();
      }
      this.docRef
        .update({
          todos: firebase.firestore.FieldValue.arrayRemove(this.todoData),
        })
        .then(() => {
          this.addTodo();
        });
    }
  }
  addLink(type: string) {
    if (type == 'open-form') {
      this.openLinkform = true;
    } else if (type == 'add-link') {
      if (this.linkForm.valid) {
        const linksArray = this.todo.get('links') as FormArray;
        linksArray.push(this.linkForm);
        this.docRef
          .update({
            todos: firebase.firestore.FieldValue.arrayRemove(this.todoData),
          })
          .then(() => {
            this.docRef.update({
              todos: firebase.firestore.FieldValue.arrayUnion(this.todo.value),
            });
            this.linkForm.reset();
          });
      }
    }
  }

  closeLinkForm() {
    this.openLinkform = false;
  }
}
