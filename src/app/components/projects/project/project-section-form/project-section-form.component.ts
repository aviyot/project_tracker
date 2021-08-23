import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AngularFirestoreDocument,
  combineChange,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormConfig } from 'src/models/form-config.model';
import { FormAction } from 'src/types/form-action.type';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { ActionTypes } from 'src/models/action-types';

@Component({
  selector: 'app-project-section-form',
  templateUrl: './project-section-form.component.html',
  styleUrls: ['./project-section-form.component.scss'],
})
export class ProjectSectionFormComponent implements OnInit {
  //Input FROM
  @Input('inputData') inputFormData: any;
  @Input('firestoreField') firestoreField: string;
  @Input('docRef') docRef;
  @Input('controlFields') controlFields: FormConfig;
  dataType: 'array' | 'map';
  controlFieldKeys: string[];
  formGroup: FormGroup;
  @Input() projectId;
  colRef;

  //Output
  @Output() formAction: EventEmitter<FormAction> = new EventEmitter();
  formActionsNew: ActionTypes;
  formActionsUpdate: ActionTypes;

  //Local
  fieldName: string;
  formDesc = {};
  formValue: any;
  dataIn: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
    this.colRef = this.docRef;
    this.docRef = this.docRef.doc(this.projectId);
    this.fieldName = this.controlFields.controlName.dataFieldName;
    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);
    this.controlFieldKeys.forEach((key) => {
      this.formDesc[key] = this.controlFields.controlFields[key].value;
    });
    this.dataType = this.controlFields.controlName.type;
    this.formGroup = this.fb.group(this.formDesc);
    if (this.inputFormData) {
      this.formGroup.patchValue(this.inputFormData);
    }
  }

  addData(formAction?: FormAction) {
    if (this.dataType == 'array') {
      this.docRef
        .update({
          [this.fieldName]: firebase.firestore.FieldValue.arrayUnion(
            this.formGroup.value
          ),
        })
        .then(() => {
          this.formAction.emit(formAction);
        });
    }
    if (this.dataType == 'map') {
      this.docRef
        .update({
          [this.fieldName]: this.formGroup.value,
        })
        .then(() => {
          this.formAction.emit(formAction);
        });
    }
  }

  removeData(formAction?: FormAction): any {
    if (this.dataType == 'array') {
      return this.docRef.update({
        [this.fieldName]: firebase.firestore.FieldValue.arrayRemove(
          this.inputFormData
        ),
      });
    }
    if (this.dataType == 'map' && this.fieldName !== 'projectDesc') {
      return this.docRef.update({
        [this.fieldName]: firebase.firestore.FieldValue.delete(),
      });
    }
    if (this.dataType == 'map' && this.fieldName == 'projectDesc') {
      return this.docRef.delete().then(() => {
        alert('project deleted');
      });
    }
  }

  updateData(formAction?: FormAction) {
    if (this.dataType == 'array') {
      this.removeData().then(() => {
        this.docRef
          .update({
            [this.fieldName]: firebase.firestore.FieldValue.arrayUnion(
              this.formGroup.value
            ),
          })
          .then(() => {
            this.formAction.emit(formAction);
          });
      });
    }

    if (this.dataType == 'map') {
      this.docRef
        .update({
          [this.fieldName]: this.formGroup.value,
        })
        .then(() => {
          this.formAction.emit(formAction);
        });
    }
  }

  onFormAction(formAction: FormAction) {
    switch (formAction) {
      case 'ADD':
        this.addData(formAction);
        break;
      case 'ADD_EXIT':
        this.addData(formAction);
        break;
      case 'SAVE':
        this.updateData(formAction);
        break;
      case 'SAVE_EXIT':
        this.updateData(formAction);
        break;
      case 'EXIT':
        this.formAction.emit(formAction);
        break;
      case 'DELETE':
        this.removeData(formAction);
        break;

      default:
        break;
    }
  }
}
