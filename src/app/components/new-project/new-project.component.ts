import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectData } from 'src/models/project-data.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projectName: FormControl = new FormControl('', Validators.required);
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
    if (this.projectName.valid) {
      this.firestore
        .collection('users')
        .doc(this.user.uid)
        .collection('projects')
        .add({
          projectDesc: {
            name: this.projectName.value,
          },
        })
        .then((doc) => {
          alert('data added');
          this.projectName.reset();

          this.added = true;
          if (exit) {
            this.router.navigate(['./', 'app-project', doc.id]);
          }
        });
    } else {
      alert('data no valid');
    }
  }

  exitForm() {
    this.router.navigate(['./', 'app-projects']);
  }
}
