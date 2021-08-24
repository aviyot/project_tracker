export interface FormConfig {
  controlName: {
    type: 'map' | 'array';
    dataFieldName: string;
    title: string;
  };
  controlFields: {
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
  };
}
