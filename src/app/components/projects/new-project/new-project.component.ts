import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { ActionTypes } from 'src/models/action-types';
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
        this.addNewProject().then(() => {
          this.formAction.emit('ADD');
        });
        break;
      case 'ADD_EXIT':
        this.addNewProject().then(() => {
          this.formAction.emit('ADD_EXIT');
        });
        break;
      case 'EXIT':
        this.formAction.emit('EXIT');
        break;

      default:
        break;
    }
  }
}
