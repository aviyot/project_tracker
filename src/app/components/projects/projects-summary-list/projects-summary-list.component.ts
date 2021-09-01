import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListAction } from 'src/models/list-action';
import { Project } from 'src/models/project.model';
import { ProjectSection } from 'src/types/project-sections.type';

@Component({
  selector: 'app-projects-summary-list',
  templateUrl: './projects-summary-list.component.html',
  styleUrls: ['./projects-summary-list.component.scss'],
})
export class ProjectsSummaryListComponent implements OnInit {
  @Input() editable: boolean = false;
  @Input() projects: Project[];
  @Output() itemSelected = new EventEmitter<ListAction>();
  @Input() detial: boolean;
  showFullPath = false;
  constructor() {}

  ngOnInit(): void {}

  onShowFullPath(full: boolean) {
    this.showFullPath = full;
  }

  selectProject(event: ProjectSection, projectIndex: number) {
    this.itemSelected.emit({
      action: 'VIEW_ITEM',
      item: projectIndex,
      section: event,
    });
  }
}
