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
        type: 'array',
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
          value: [new Date().toISOString().slice(0, 16)],
          type: 'datetime-local',
          label: 'זמן התחלה',
          order: 4,
        },
        endTime: {
          value: [],
          type: 'datetime-local',
          label: 'זמן סיום',
          order: 4,
        },
      },
    };
  }
}
