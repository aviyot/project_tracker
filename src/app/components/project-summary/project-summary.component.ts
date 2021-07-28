import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
})
export class ProjectSummaryComponent implements OnInit {
  @Input() selectedProject: Project;
  constructor() {}

  ngOnInit() {}
}
