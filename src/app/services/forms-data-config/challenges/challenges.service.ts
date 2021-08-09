import { Injectable } from '@angular/core';
import { Challenge } from 'src/models/challenge.model';
import { FormConfig } from 'src/models/form-config.model';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  formConfig: FormConfig;

  constructor() {
    this.formConfig = {
      controlName: {
        type: 'array',
        dataFieldName: 'challenges',
        title: 'קשיים',
      },
      controlFields: {
        title: {
          value: [],
          type: 'text',
          label: 'שם קושי',
          order: 1,
        },
        challenge: {
          value: [],
          type: 'textarea',
          label: 'תיאור הקושי',
          order: 1,
        },
        solution: {
          value: [],
          type: 'textarea',
          label: 'פתרונות',
          order: 1,
        },
      },
    };
  }

  formControlConfig() {
    let controlFieldKeys = Object.keys(this.formConfig.controlFields);
    let formDesc = {};
    controlFieldKeys.forEach((key) => {
      formDesc[key] = this.formConfig.controlFields[key].value;
    });
  }
}
