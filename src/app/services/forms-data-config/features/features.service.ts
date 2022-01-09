import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormConfig } from 'src/models/form-config.model';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {
  /*    name: ['',Validators.required],
      desc: [''],
      startDate: [''],
      endDate: [''],
      progress: [''],
  constructor() { }
   */
  formConfig: FormConfig;
  constructor() {
    this.formConfig = {
      controlName: {
        type: 'array',
        dataFieldName: 'features',
        title: 'פיצרים',
      },
      controlFields: {
        name: {
          value: ['', Validators.required],
          type: 'text',
          label: 'שם פיצר',
          order: 1,
        },
        desc: {
          value: [],
          type: 'textarea',
          label: 'תיאור',
          order: 2,
        },
        startDate: {
          value: [new Date()],
          type: 'date',
          label: 'תאריך התחלה',
          order: 3,
        },
        endDate: {
          value: [new Date()],
          type: 'date',
          label: 'תאריך סיום',
          order: 3,
        },
        progress: {
          value: [''],
          type: 'text',
          label: 'התקדמות',
          order: 3,
        },
      },
    };
  }
}
