import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormConfig } from 'src/models/form-config.model';

@Injectable({
  providedIn: 'root',
})
export class HowTodoService {
  formConfig: FormConfig;
  constructor() {
    this.formConfig = {
      controlName: {
        type: 'array',
        dataFieldName: 'howTodos',
        title: 'איך לעשות',
      },
      controlFields: {
        title: {
          value: ['', Validators.required],
          type: 'text',
          label: 'כותרת',
          order: 1,
        },
        desc: {
          value: [],
          type: 'textarea',
          label: 'תיאור',
          order: 2,
        },
        steps: {
          value: [],
          type: 'textarea',
          label: 'רשימת צעדים',
          order: 3,
        },
        order: {
          value: [true],
          type: 'checkbox',
          label: 'לפי סדר?',
          order: 4,
        },
      },
    };
  }
}
