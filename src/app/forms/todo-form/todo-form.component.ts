import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

@Input('todo') todoData : Todo | null;
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
  }

  saveTodo(){

  }

}
