export interface FormConfig {
  controlName: {
    type: 'map' | 'array';
    dataFieldName: string;
    title: string;
  };
  controlFields: {
    [key: string]: {
      value: any[];
        | 'datetime-local'
      label: string;
      order: number;
      option?: string[];
    };
  };
}
