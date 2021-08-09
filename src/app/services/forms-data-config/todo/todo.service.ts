import { Injectable } from '@angular/core';
import { FormConfig } from 'src/models/form-config.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  formConfig: FormConfig;
  constructor() {
    this.formConfig = {
      controlName: {
        type: 'array',
        dataFieldName: 'todos',
        title: 'משימות',
      },
      controlFields: {
        title: {
          value: [],
          type: 'text',
          label: 'שם משימה',
          order: 1,
        },
        detail: {
          value: [],
          type: 'textarea',
          label: 'תיאור',
          order: 1,
        },
        startTime: {
          value: [new Date()],
          type: 'date',
          label: 'זמן התחלה',
          order: 2,
        },
        endTime: {
          value: [],
          type: 'date',
          label: 'זמן סיום',
          order: 3,
        },
        status: {
          value: ['בתיכנון'],
          type: 'select',
          label: 'סטטוס',
          option: ['בתיכנון', 'בעבודה', 'נעצר', 'הסתיים'],
          order: 4,
        },
        gitCommit: {
          value: [''],
          type: 'text',
          label: 'גיט קומיט',
          order: 5,
        },
        makingDesc: {
          value: [''],
          type: 'textarea',
          label: 'תיאור העבודה',
          order: 6,
        },
      },
    };
  }
}
