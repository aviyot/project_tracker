import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FormAction } from 'src/types/form-action.type';
import { FormConfig } from 'src/models/form-config.model';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css'],
})
export class FormDataComponent implements OnInit {
  //Input FROM
  @Input('data') inputFormData: any;
  @Input('firestoreField') firestoreField: string;
  @Input('docRef')
  docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  @Input('controlFields') controlFields: FormConfig;

  //Output
  @Output() formAction: EventEmitter<FormAction> = new EventEmitter();

  //Local
  controlFieldKeys = [];
  fieldName: string;
  formDesc = {};
  formValue: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fieldName = this.controlFields.controlName.dataFieldName;
    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);
    this.controlFieldKeys.forEach((key) => {
      this.formDesc[key] = this.controlFields.controlFields[key].value;
    });
  }

  formValueChange(value) {
    this.formValue = value;
  }
  addData() {
    this.docRef
      .update({
        [this.fieldName]: firebase.firestore.FieldValue.arrayUnion(
          this.formValue
        ),
      })
      .then(() => {
        this.formAction.emit('ADD');
      });
  }

  removeData() {
    return this.docRef.update({
      [this.fieldName]: firebase.firestore.FieldValue.arrayRemove(
        this.inputFormData
      ),
    });
  }

  updateData() {
    this.removeData().then(() => {
      this.addData();
    });
  }
}