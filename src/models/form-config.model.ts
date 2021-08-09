export interface FormConfig {
  controlName: {
    type: 'FormGroup' | 'FormArray' | 'FormControl';
    dataFieldName: string;
    title: string;
  };
  controlFields: {
    [key: string]: {
      value: any[];
      type: 'text' | 'textarea' | 'date' | 'select' | 'checkbox' | 'href';
      label: string;
      order: number;
      option?: string[];
    };
  };
}
