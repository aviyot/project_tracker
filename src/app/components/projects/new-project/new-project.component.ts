import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
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
  @Input() projectsCollectionRef: AngularFirestoreCollection;
  @Output() formAction = new EventEmitter<FormAction>();
  formActions: ActionTypes; //app-form-action-toolbar;

  projectName: FormControl = new FormControl('', Validators.required);
  projects: ProjectData[] = [];
  currentProject: ProjectData;
  user: any;
  new: boolean = true;
  added = false;
  exit = false;

  constructor() {
    this.formActions = {
      ADD: true,
      ADD_EXIT: true,
      EXIT: true,
    };
  }
  ngOnInit(): void {}

  updateNewProject(newProject: ProjectData) {
    this.currentProject = newProject;
  }

  saveFormData(exit?: boolean, formAction?: FormAction) {
    if (this.projectName.valid) {
      this.projectsCollectionRef
        .add({
          projectDesc: {
            name: this.projectName.value,
          },
        })
        .then(() => {
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
