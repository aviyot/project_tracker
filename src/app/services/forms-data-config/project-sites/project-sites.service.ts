import { Injectable } from '@angular/core';
import { FormConfig } from 'src/models/form-config.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectSitesService {
  formConfig: FormConfig;

  constructor() {
    this.formConfig = {
      controlName: {
        title: 'אתרים',
        dataFieldName: 'projectDesc.sites',
        type: 'array',
      },
      controlFields: {
        url: {
          value: [''],
          type: 'href',
          label: 'אתר',
          order: 1,
        },
        main: {
          value: [true],
          type: 'checkbox',
          label: 'ראשי?',
          order: 2,
        },
        udatedAutoGithub: {
          value: [true],
          type: 'checkbox',
          label: 'אוטומטי',
          order: 3,
        },
      },
    };
  }
}
