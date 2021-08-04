import { Component, Input, OnInit } from '@angular/core';
import { FormConfig } from 'src/models/form-config.model';

@Component({
  selector: 'app-form-data-view',
  templateUrl: './form-data-view.component.html',
  styleUrls: ['./form-data-view.component.css'],
})
export class FormDataViewComponent implements OnInit {
  @Input() fieldData;
  @Input() controlFields: FormConfig;
  controlFieldKeys: string[];
  constructor() {}

  ngOnInit() {
    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);
  }
}
