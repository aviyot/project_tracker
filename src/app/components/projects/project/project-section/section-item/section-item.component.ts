import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.css'],
})
export class SectionItemComponent implements OnInit {
  @Input() controlFields;
  @Input() fieldData;
  controlFieldKeys;
  constructor() {}

  ngOnInit() {
    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);
  }
}
