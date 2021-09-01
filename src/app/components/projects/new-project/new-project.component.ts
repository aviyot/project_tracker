import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { ActionTypes } from 'src/models/action-types';
import { Project } from 'src/models/project.model';
import { FormAction } from 'src/types/form-action.type';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  @Input() projectsCollectionRef: AngularFirestoreCollection;
  @Input() projects: Project[];
  @Output() formAction = new EventEmitter<FormAction>();
  formActions: ActionTypes; //app-form-action-toolbar;
  projectName: FormControl = new FormControl('', Validators.required);

  constructor() {
    this.formActions = {
      ADD: true,
      ADD_EXIT: true,
      EXIT: true,
    };
  }
  ngOnInit(): void {}

  addNewProject(): Promise<any> {
    if (this.projectName.valid) {
      if (this.isProjectNameExit(this.projects)) {
        return new Promise((res, rej) => {
          rej('PROJECT NAME EXIT');
        });
      }
      return this.projectsCollectionRef.add({
        projectDesc: {
          name: this.projectName.value,
        },
      });
    } else {
      return new Promise((res, rej) => {
        rej('invalid data');
      });
    }
  }

  onFormAction(ev: FormAction) {
    switch (ev) {
      case 'ADD':
        this.addNewProject()
          .then(() => {
            this.formActions = {
              ...this.formActions,
              ADD: false,
              ADD_EXIT: false,
            };
            this.projectName.reset();
            this.formAction.emit('ADD');
          })
          .catch((err) => {
            alert(err);
          });
        break;
      case 'ADD_EXIT':
        this.addNewProject()
          .then(() => {
            this.formActions = {
              ...this.formActions,
              ADD: false,
              ADD_EXIT: false,
            };
            this.formAction.emit('ADD_EXIT');
          })
          .catch((err) => {
            alert(err);
          });
        break;
      case 'EXIT':
        this.formAction.emit('EXIT');
        break;

      default:
        break;
    }
  }

  isProjectNameExit(projects: Project[]): boolean {
    if (projects) {
      return projects.some((project) => {
        // console.log(this.searchObj(project.projectDesc, this.projectName.value));
        return project.projectDesc.name === this.projectName.value;
      });
    }
    return false;
  }

  searchObj(obj, query): Boolean {
    for (var key in obj) {
      if (key === 'name') {
        var value = obj[key];
        console.table(key, value);
        if (typeof value === 'object') {
          //  console.log(value);
          this.searchObj(value, query);
        }
      }

      if (value === query) {
        // console.log('property=' + key + ' value=' + value);
        return true;
      } else return false;
    }
    return false;
  }
}
