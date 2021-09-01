import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectSection } from 'src/types/project-sections.type';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
})
export class ProjectSummaryComponent implements OnInit {
  constructor() {}
  @Input() selectedProject;
  @Output() selectSection = new EventEmitter<ProjectSection>();
  ngOnInit() {}

  onSelectSection(section: ProjectSection) {
    this.selectSection.emit(section);
  }
}
