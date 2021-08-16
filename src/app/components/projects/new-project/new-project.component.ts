import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionTypes } from 'src/models/action-types';
import { ProjectData } from 'src/models/project-data.model';
import { FormAction } from 'src/types/form-action.type';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projectName: FormControl = new FormControl('', Validators.required);
  projects: ProjectData[] = [];
  currentProject: ProjectData;
  @Output() formAction = new EventEmitter<FormAction>();
  user: any;
  new: boolean = true;
  added = false;
  exit = false;
  formActions: ActionTypes;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.formActions = {
      ADD: true,
      ADD_EXIT: true,
      EXIT: true,
    };
  }
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

  saveFormData(exit?: boolean, formAction?: FormAction) {
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
          this.formAction.emit(formAction);
          this.projectName.reset();

          this.added = true;
          if (exit) {
            this.formAction.emit(formAction);
            // this.router.navigate(['./', 'app-project', doc.id]);
          }
        });
    } else {
      alert('data no valid');
    }
  }

  exitForm() {
    this.formAction.emit('EXIT');
    //this.router.navigate(['./', 'app-projects']);
  }

  onFormAction(ev: FormAction) {
    switch (ev) {
      case 'ADD':
        this.saveFormData(false, ev);
        break;
      case 'ADD_EXIT':
        this.saveFormData(true, ev);
        break;
      case 'EXIT':
        this.formAction.emit('EXIT');
        break;

      default:
        break;
    }
  }
}
