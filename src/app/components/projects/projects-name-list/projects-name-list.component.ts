import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListAction } from 'src/models/list-action';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-projects-name-list',
  templateUrl: './projects-name-list.component.html',
  styleUrls: ['./projects-name-list.component.scss'],
})
export class ProjectsNameListComponent implements OnInit {
  @Input() projects: Project[];
  @Output() itemSelected = new EventEmitter<ListAction>();

  constructor() {}

  ngOnInit(): void {}

  onSelectedItem(action: ListAction) {
    this.itemSelected.emit(action);
  }
}
