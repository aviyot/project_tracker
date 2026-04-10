import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/models/project.model';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import { ControlName } from 'src/models/form-config.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() selectedProject: Project;
  projectSections: ControlName[] = [];
  constructor(private formDataConfigService: FormDataConfigService) {}

  ngOnInit(): void {
    this.projectSections = this.formDataConfigService.getControls();
  }
}
