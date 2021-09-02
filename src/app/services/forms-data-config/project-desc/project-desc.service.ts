import { Injectable } from '@angular/core';
import { FormConfig } from 'src/models/form-config.model';
import { LIFECYCLE_STAGE } from 'src/types/lifecycleStage.type';

@Injectable({
  providedIn: 'root',
})
export class ProjectDescService {
  formConfig: FormConfig;

  projectStatuses = ['פיתוח', 'הסתיים', 'לא התחיל'];

  constructor() {
    this.formConfig = {
      controlName: {
        type: 'map',
        dataFieldName: 'projectDesc',
        title: 'מאפיינים',
      },
      controlFields: {
        name: {
          value: [],
          type: 'text',
          label: 'שם פרויקט',
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
          value: [],
          type: 'date',
          label: 'תאריך סיום',
          order: 3,
        },
        lifecycleStage: {
          value: ['planning'],
          type: 'select',
          label: 'שלב ',
          option: this.projectStatuses,
          order: 3,
        },
        gitHub: {
          value: [''],
          type: 'href',
          label: 'גיטהב',
          option: this.projectStatuses,
          order: 3,
        },
        site: {
          value: [''],
          type: 'href',
          label: 'אתר של הפרויקט',
          order: 4,
        },
      },
    };
  }
}
