import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo';
import firebase from "firebase/app";
import "firebase/firestore";
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

@Input('todo') todoData : Todo | null;
@Input('docRef') docRef:AngularFirestoreDocument<firebase.firestore.DocumentData>;
todo:FormGroup;
  constructor(private fb: FormBuilder) { 
  }

  ngOnInit(): void {
   this.todo = this.fb.group({
      title: [''],
      detail: ['',Validators.required],
      date: [''],
      done: [false],
    });

    if(this.todoData)
     this.todo.setValue(this.todoData);
  }

  addTodo(){
    this.docRef.update({
      todos:firebase.firestore.FieldValue.arrayUnion(this.todo.value)
    }).then(()=>{
      this.todo.reset();
    })
  }

  saveTodo(){

  }

}
