import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-field',
  templateUrl: './item-field.component.html',
  styleUrls: ['./item-field.component.scss'],
})
export class ItemFieldComponent implements OnInit {
  @Input() fieldName: string;
  @Input() fieldLabel: string;
  @Input() fieldType: string;
  constructor() {}

  ngOnInit() {}
}
