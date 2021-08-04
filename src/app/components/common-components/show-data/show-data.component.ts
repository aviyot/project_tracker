import { Component, Input, OnInit } from '@angular/core';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import { FormState } from 'src/models/ui/form-state';
import firebase from 'firebase/app';
import { FormAction } from 'src/types/form-action.type';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css'],
})
export class ShowDataComponent implements OnInit {
  @Input() docRef: any;
  controlFields: any;
  @Input() fieldName: string;
  @Input() selectedProject;
  formState: FormState;

  constructor(private formDataConfigService: FormDataConfigService) {}

  ngOnInit() {
    this.controlFields = this.formDataConfigService.getFormConfig(
      this.fieldName
    );
    this.formState = { add: false, edit: false, selectedIndex: null };
  }

  addData() {
    this.formState.add = !this.formState.add;
  }
  editData(index: number) {
    if (this.formState.selectedIndex !== index) this.formState.edit = true;
    else this.formState.edit = !this.formState.edit;
    this.formState.selectedIndex = index;
  }

  deleteData(data) {
    this.docRef.update({
      features: firebase.firestore.FieldValue.arrayRemove(data),
    });
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
      this.docRef.update({
        [fieldName]: firebase.firestore.FieldValue.delete(),
      });
    }
  }
}
