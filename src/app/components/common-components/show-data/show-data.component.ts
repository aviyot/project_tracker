import { Component, Input, OnInit } from '@angular/core';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import { FormState } from 'src/models/ui/form-state';
import firebase from 'firebase/app';
import { FormAction } from 'src/types/form-action.type';
import { Router } from '@angular/router';

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
  fieldSize: number;

  constructor(
    private formDataConfigService: FormDataConfigService,
    private router: Router
  ) {}

  ngOnInit() {
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
    this.formState = { add: false, edit: false, selectedIndex: null };
  }

  isArray(data: any): boolean {
    return Array.isArray(data);
  }
  addData() {
    this.formState.add = !this.formState.add;
  }
  editData(index?: number) {
    if (index) {
      if (this.formState.selectedIndex !== index) this.formState.edit = true;
      else this.formState.edit = !this.formState.edit;
      this.formState.selectedIndex = index;
    } else {
      this.formState.edit = !this.formState.edit;
    }
  }

  deleteData(data) {
    this.docRef
      .update({
        [this.fieldName]: firebase.firestore.FieldValue.arrayRemove(
          data[this.fieldName]
        ),
      })
      .then(() => {
        this.router.navigate(['./', 'app-projects']);
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
