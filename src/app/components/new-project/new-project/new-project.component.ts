import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ProjectData } from 'src/models/project-data.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projects: ProjectData[] = [];
  currentProject: ProjectData;
  user: any;
  new: boolean = true;
  added = false;
  exit = false;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  updateNewProject(newProject: ProjectData) {
    this.currentProject = newProject;
  }

  saveFormData(exit?: boolean) {
    if (this.user.uid) {
      this.firestore
        .collection('users')
        .doc(this.user.uid)
        .collection('projects')
        .add(this.currentProject)
        .then((doc) => {
          this.added = true;
          if (exit) {
            this.router.navigate(['./', 'app-project', doc.id]);
          }
        });
    } else {
      console.log('invaild user data');
    }
  }

  exitForm() {
    this.router.navigate(['./', 'app-projects']);
  }
}
