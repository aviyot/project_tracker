import { Injectable } from '@angular/core';
import { FormConfig } from 'src/models/form-config.model';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  formConfig: FormConfig;
  constructor() {
    this.formConfig = {
      controlName: {
        type: 'FormGroup',
        dataFieldName: 'challenges',
        title: 'קשיים',
      },
      controlFields: {
        title: {
          value: [],
          type: 'text',
          label: 'כותרת',
          order: 1,
        },
        challenge: {
          value: [],
          type: 'textarea',
          label: 'קושי',
          order: 1,
        },
        solution: {
          value: [],
          type: 'textarea',
          label: 'פתרון',
          order: 1,
        },
      },
    };
  }
}
