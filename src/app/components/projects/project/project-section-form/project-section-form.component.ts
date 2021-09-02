import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { FormConfig } from 'src/models/form-config.model';
import { FormAction } from 'src/types/form-action.type';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { ActionTypes } from 'src/models/action-types';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { IsTimestampService } from 'src/app/services/is-timestamp.service';

@Component({
  selector: 'app-project-section-form',
  templateUrl: './project-section-form.component.html',
  styleUrls: ['./project-section-form.component.scss'],
})
export class ProjectSectionFormComponent implements OnInit {
  //Input FROM
  @Input('inputData') inputFormData: any;
  @Input('firestoreField') firestoreField: string;
  @Input() projectDocRef: AngularFirestoreDocument;
  @Input('controlFields') controlFields: FormConfig;

  dataType: 'array' | 'map';
  controlFieldKeys: string[];
  formGroup: FormGroup;
  colRef;
  newData: boolean;
  formActionsNew: ActionTypes;
  formActionsUpdate: ActionTypes;
  //Output
  @Output() formAction: EventEmitter<FormAction> = new EventEmitter();

  //Local
  fieldName: string;
  formDesc = {};
  formValue: any;
  dataIn: any;

  constructor(
    private fb: FormBuilder,
    private isTimestampService: IsTimestampService
  ) {}

  ngOnInit() {
    if (this.inputFormData === undefined) this.newData = true;
    else this.newData = false;

    this.formActionsNew = {
      ADD: true,
      ADD_EXIT: true,
      EXIT_ADD: true,
    };
    this.formActionsUpdate = {
      SAVE: true,
      SAVE_EXIT: true,
      DELETE: true,
      EXIT_EDIT: true,
    };
    //this.docRef = this.docRef.doc(this.projectId);

    this.fieldName = this.controlFields.controlName.dataFieldName;
    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);
    this.controlFieldKeys.forEach((key) => {
      this.formDesc[key] = this.controlFields.controlFields[key].value;
    });
    this.dataType = this.controlFields.controlName.type;
    this.formGroup = this.fb.group(this.formDesc);

    if (this.inputFormData) {
      if (this.isTimestampService.isTimestamp(this.inputFormData.startDate)) {
        this.inputFormData.startDate = this.inputFormData.startDate.toDate();
      }

      if (this.isTimestampService.isTimestamp(this.inputFormData.endDate)) {
        this.inputFormData.endDate = this.inputFormData.endDate.toDate();
      }

      this.formGroup.patchValue(this.inputFormData);
    }
  }

  addData(): Promise<any> {
    if (this.dataType == 'array') {
      return this.projectDocRef.update({
        [this.fieldName]: firebase.firestore.FieldValue.arrayUnion(
          this.formGroup.value
        ),
      });
    } else if (this.dataType == 'map') {
      return this.projectDocRef.update({
        [this.fieldName]: this.formGroup.value,
      });
    } else {
      return new Promise((resolve, reject) => {
        reject('no find data type');
      });
    }
  }

  removeData(): Promise<any> {
    if (this.dataType == 'array') {
      return this.projectDocRef.update({
        [this.fieldName]: firebase.firestore.FieldValue.arrayRemove(
          this.inputFormData
        ),
      });
    } else if (this.dataType == 'map' && this.fieldName !== 'projectDesc') {
      return this.projectDocRef.update({
        [this.fieldName]: firebase.firestore.FieldValue.delete(),
      });
    } else if (this.dataType == 'map' && this.fieldName == 'projectDesc') {
      if (
        confirm(
          `DANGER : delete ****** ${this.inputFormData.name} ****** project ?`
        )
      )
        return this.projectDocRef.delete().then(() => {});
      else {
        return new Promise((resolve, reject) => {
          reject('delete canceled');
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject('no find data type');
      });
    }
  }

  updateData(): Promise<any> {
    if (this.dataType == 'array') {
      return this.removeData().then(() => {
        return this.projectDocRef.update({
          [this.fieldName]: firebase.firestore.FieldValue.arrayUnion(
            this.formGroup.value
          ),
        });
      });
    } else if (this.dataType == 'map') {
      return this.projectDocRef.update({
        [this.fieldName]: this.formGroup.value,
      });
    } else {
      return new Promise((resolve, reject) => {
        reject('no find data type');
      });
    }
  }

  onFormAction(formAction: FormAction) {
    switch (formAction) {
      case 'ADD':
        this.addData().then(() => {
          this.formAction.emit(formAction);
        });
        break;
      case 'ADD_EXIT':
        this.addData().then(() => {
          this.formAction.emit(formAction);
        });
        break;
      case 'EXIT_ADD':
        this.formAction.emit(formAction);
        break;
      case 'SAVE':
        this.formAction.emit(formAction);
        this.updateData().then(() => {});
        break;
      case 'SAVE_EXIT':
        this.formAction.emit(formAction);
        this.updateData().then(() => {});
        break;
      case 'EXIT_EDIT':
        this.formAction.emit(formAction);
        break;
      case 'EXIT':
        this.formAction.emit(formAction);
        break;
      case 'DELETE':
        this.formAction.emit(formAction);
        this.removeData().then(() => {});
        break;

      default:
        break;
    }
  }
}
