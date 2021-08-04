export interface FormConfig {
  controlName: {
    type: 'FormGroup' | 'FormArray' | 'FormControl';
    dataFieldName: string;
    title: string;
  };
  controlFields: {
    [key: string]: {
      value: any[];
      type: 'text' | 'textarea' | 'date' | 'select' | 'checkbox';
      label: string;
      order: number;
      option?: string[];
    };
  };
}
