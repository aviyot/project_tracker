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

  //Local
  fieldName: string;
  formDesc = {};
  formValue: any;
  dataIn: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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

  addData() {
    if (this.dataType == 'array') {
      this.docRef
        .update({
          [this.fieldName]: firebase.firestore.FieldValue.arrayUnion(
            this.formGroup.value
          ),
        })
        .then(() => {
          this.formAction.emit('ADD');
        });
    }
    if (this.dataType == 'map' || this.fieldName == 'projectDesc') {
      this.docRef
        .update({
          [this.fieldName]: this.formGroup.value,
        })
        .then(() => {
          this.formAction.emit('ADD');
        });
    }
  }

  removeData(): any {
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
  }

  updateData() {
    if (this.dataType == 'array') {
      this.removeData().then(() => {
        this.addData();
      });
    }

    if (this.dataType == 'map' || this.fieldName == 'projectDesc') {
      this.docRef
        .update({
          [this.fieldName]: this.formGroup.value,
        })
        .then(() => {
          this.formAction.emit('SAVE');
        });
    }
  }
}
