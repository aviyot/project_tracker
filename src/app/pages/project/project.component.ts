import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';
import firebase from "firebase/app";
import "firebase/firestore";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: Observable<Project[]> = new Observable<Project[]>();
  selectedProject: any;
  edit = false;
  add = false;
  docRef = null;
  selectedIndex:number;

  constructor(
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.docRef = this.firestore
      .collection('users')
      .doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2')
      .collection('projects')
      .doc(p.get('project_id'));

      this.selectedProject = this.docRef
        .valueChanges({ idField: 'id' })
        .subscribe((p) => {
          this.selectedProject = p;
        });
    });
  }

  deleteProject() {
    let answer = confirm('delete?');

    if (answer) {
      this.firestore
        .collection('users')
        .doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2')
        .collection('projects')
        .doc(this.selectedProject.id)
        .delete()
        .then(() => {
          console.log('deleted');
        });
    }
  }

  editProject() {
    if (confirm(' EDIT ? ')) {
      this.router.navigate([
        '/',
        'new-project',
        'edit',
        this.selectedProject.id,
      ]);
    }
  }

  addTodo() {
    this.add = !this.add;
  }

  editTodo(todoIndex) {
    
    if(this.selectedIndex !== todoIndex)
      this.edit = true;
    else
       this.edit = !this.edit;

    this.selectedIndex = todoIndex;
  }

  deleteTodo(todo) {
    this.docRef.update({
      todos:firebase.firestore.FieldValue.arrayRemove(todo)
    })
  }


}
