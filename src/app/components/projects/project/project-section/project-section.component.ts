import { Component, Input, OnInit } from '@angular/core';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import { FormState } from 'src/models/ui/form-state';
import firebase from 'firebase/app';
import { FormAction } from 'src/types/form-action.type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.css'],
})
export class ProjectSectionComponent implements OnInit {
  controlFieldKeys: string[];
  @Input() docRef: any;
  controlFields: any;
  @Input() fieldName: string;
  @Input() selectedProject;
  formState: FormState;
  fieldSize: number;
  projectId;
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

    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);

    this.formState = { add: false, edit: false, selectedIndex: null };
  }

  isArray(data: any): boolean {
    return Array.isArray(data);
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

  deleteData(data) {
    this.docRef
      .doc(this.selectedProject.id)
      .update({
        [this.fieldName]: firebase.firestore.FieldValue.arrayRemove(
          data[this.fieldName]
        ),
      })
      .then(() => {});
  }

  onFormAction(action: FormAction) {
    if (action == 'ADD') {
      this.formState = { ...this.formState, add: false };
    }
    if (action == 'SAVE') {
      this.formState = { ...this.formState, edit: false };
    }
  }
  deleteAllData(fieldName) {
    if (confirm('Delte All Data')) {
      this.docRef.doc(this.selectedProject.id).update({
        [fieldName]: firebase.firestore.FieldValue.delete(),
      });
    }
  }
}
