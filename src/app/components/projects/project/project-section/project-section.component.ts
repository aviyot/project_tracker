import { Component, Input, OnInit } from '@angular/core';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import { FormState } from 'src/models/ui/form-state';
import firebase from 'firebase/app';
import { FormAction } from 'src/types/form-action.type';
import { Router } from '@angular/router';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Project } from 'src/models/project.model';
@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.css'],
})
export class ProjectSectionComponent implements OnInit {
  //inputs
  @Input() projectDocRef: AngularFirestoreDocument;
  @Input() fieldName: string;
  @Input() selectedProject: Project;
  @Input() editMode = false;

  controlFieldKeys: string[];
  controlFields: any;
  formState: FormState;
  fieldSize: number;
  projectId: string;
  fieldType: string;

  constructor(private formDataConfigService: FormDataConfigService) {}

  ngOnInit() {
    this.projectId = this.selectedProject.id;
    if (this.isArray(this.selectedProject[this.fieldName])) {
      if (this.selectedProject[this.fieldName])
        this.fieldSize = this.selectedProject[this.fieldName].length;
      else this.fieldSize = undefined;
    } else {
      this.fieldSize = undefined;
    }

    this.controlFields = this.formDataConfigService.getFormConfig(
      this.fieldName
    );
    this.fieldType = this.controlFields.controlName.type;
    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);

    this.formState = { add: false, edit: false, selectedIndex: null };
  }

  isArray(data: any): boolean {
    if (this.fieldType == 'array' && Array.isArray(data)) return true;
    else return false;
  }
  addData() {
    this.formState.add = !this.formState.add;
  }
  editData(index?: number) {
    if (index !== null || index !== undefined) {
      if (this.formState.selectedIndex !== index) this.formState.edit = true;
      else this.formState.edit = !this.formState.edit;
      this.formState.selectedIndex = index;
    } else {
      this.formState.edit = !this.formState.edit;
    }
  }

  /*   deleteData(data) {
    this.docRef
      .doc(this.selectedProject.id)
      .update({
        [this.fieldName]: firebase.firestore.FieldValue.arrayRemove(data),
      })
      .then(() => {});
  }
 */
  onFormAction(action: FormAction) {
    switch (action) {
      case 'EXIT_ADD':
        this.formState = { ...this.formState, add: false };
        break;
      case 'ADD_EXIT':
        this.formState = { ...this.formState, add: false };
        break;
      case 'EXIT_EDIT':
        this.formState = { ...this.formState, edit: false };
        break;
      case 'SAVE_EXIT':
        this.formState = { ...this.formState, edit: false };
        break;
      case 'DELETE':
        this.formState = { ...this.formState, edit: false };
        break;
      default:
        this.formState = { ...this.formState };
        break;
    }
  }
  deleteAllData(fieldName) {
    if (confirm('Delte All Data')) {
      this.projectDocRef.update({
        [fieldName]: firebase.firestore.FieldValue.delete(),
      });
    }
  }

  editFields() {
    this.editMode = !this.editMode;
  }
}
