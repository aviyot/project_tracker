import { Injectable } from '@angular/core';
import { FormConfig } from 'src/models/form-config.model';

@Injectable({
  providedIn: 'root',
})
export class WorkTimesService {
  /*  startTime:[''],
      endTime:[''],
      task:['',Validators.required] */
  formConfig: FormConfig;
  constructor() {
    this.formConfig = {
      controlName: {
        type: 'FormGroup',
        dataFieldName: 'workTimes',
        title: 'זמני עבודה',
      },
      controlFields: {
        task: {
          value: [],
          type: 'textarea',
          label: 'משימה',
          order: 2,
        },
        startTime: {
          value: [new Date()],
          type: 'date',
          label: 'תאריך התחלה',
          order: 3,
        },
        endTime: {
          value: [new Date()],
          type: 'date',
          label: 'תאריך התחלה',
          order: 3,
        },
      },
    };
  }
}
