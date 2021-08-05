import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  @Input() tool;
  @Input() editable;
  constructor() {}

  ngOnInit(): void {}
}
