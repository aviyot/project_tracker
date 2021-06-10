import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() docRef;
  todoState:FormState;

  doneHided = false;

  constructor() { }

  ngOnInit(): void {
    this.todoState = { add: false, edit: false, selectedIndex: null }
  }

  addTodo() {
    this.todoState.add = !this.todoState.add;
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
}
