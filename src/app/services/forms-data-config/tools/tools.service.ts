import { Injectable } from '@angular/core';
import { FormConfig } from 'src/models/form-config.model';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  /*   name: [''],
      desc: [''],
      purpose: [''],
      ver: [''],
      webSite: [''],
      githubLink: [''],
      npmLink: [''],
      type:['']
    }); */
  formConfig: FormConfig;
  constructor() {
    this.formConfig = {
      controlName: {
        type: 'array',
        dataFieldName: 'tools',
        title: 'כלים',
      },
      controlFields: {
        name: {
          value: [],
          type: 'text',
          label: 'שם כלי',
          order: 1,
        },
        desc: {
          value: [],
          type: 'textarea',
          label: 'תיאור',
          order: 2,
        },
        purpose: {
          value: [],
          type: 'textarea',
          label: 'מטרה',
          order: 3,
        },
        ver: {
          value: [],
          type: 'text',
          label: 'גירסה',
          order: 4,
        },
        githubLink: {
          value: [],
          type: 'text',
          label: 'github',
          order: 5,
        },
        npmLink: {
          value: [],
          type: 'text',
          label: 'npm',
          order: 5,
        },
        toolType: {
          value: [],
          type: 'select',
          option: ['a', 'b'],
          label: 'סוג',
          order: 6,
        },
      },
    };
  }
}
