export interface ControlName {
  type: 'map' | 'array';
  dataFieldName: string;
  title: string;
}

export interface ControlFields {
  [key: string]: {
    value: any[];
    type:
      | 'text'
      | 'textarea'
      | 'date'
      | 'select'
      | 'checkbox'
      | 'href'
      | 'time'
      | 'datetime-local'
      | 'number';
    label: string;
    order: number;
    option?: string[];
  };
}
export interface FormConfig {
  controlName: ControlName;
  controlFields: ControlFields;
}
