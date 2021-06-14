import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo';
import firebase from "firebase/app";
import "firebase/firestore";
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { TODO_STATUS } from 'src/types/todo_status.type';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

@Input('todo') todoData : Todo | null;
@Input('docRef') docRef:AngularFirestoreDocument<firebase.firestore.DocumentData>;
todo:FormGroup;
status:TODO_STATUS[] = ['PLANNED','IN_PROGRESS','NOT_NEEDED','STUCK','COMPLETED'];
  constructor(private fb: FormBuilder) { 
  }

  ngOnInit(): void {
   this.todo = this.fb.group({
      title: [''],
      detail: ['',Validators.required],
      date: [''],
      status:[this.status[0]]
    });

    if(this.todoData)
     this.todo.patchValue(this.todoData);
  }

  addTodo(){
    this.docRef.update({
      todos:firebase.firestore.FieldValue.arrayUnion(this.todo.value)
    }).then(()=>{
      this.todo.reset();
    })
  }

  saveTodo(){
    this.docRef.update({
      todos:firebase.firestore.FieldValue.arrayRemove(this.todoData)
    }).then(()=>{
         this.addTodo();
    })
  }

}
