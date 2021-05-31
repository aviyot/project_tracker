import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';

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

  constructor(
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      console.log(p.get('project_id'));
      this.selectedProject = this.firestore
        .collection('users')
        .doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2')
        .collection('projects')
        .doc(p.get('project_id'))
        .valueChanges({ idField: 'id' })
        .subscribe((p) => {
          console.log(p);
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
    this.edit = !this.edit;
  }

  deleteTodo(todoIndex) {
    
  }


}
