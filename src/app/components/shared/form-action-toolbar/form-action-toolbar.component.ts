import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActionTypes } from 'src/models/action-types';
import { FormAction } from 'src/types/form-action.type';
@Component({
  selector: 'app-form-action-toolbar',
  templateUrl: './form-action-toolbar.component.html',
  styleUrls: ['./form-action-toolbar.component.scss'],
})
export class FormActionToolbarComponent implements OnInit {
  @Output() formAction = new EventEmitter<FormAction>();
  @Input('formActions') actions: ActionTypes;
  constructor() {}

  ngOnInit() {}

  onChange(ev: MatButtonToggleChange) {
    this.formAction.emit(ev.value);
  }
}
