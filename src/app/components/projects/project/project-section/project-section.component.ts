import { Component, Input, OnInit } from '@angular/core';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import firebase from 'firebase/app';
import { Project } from 'src/models/project.model';
import { ProjectsDataService } from 'src/app/services/projects/projects-data.service';
import { ControlName } from 'src/models/form-config.model';
@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.css'],
})
export class ProjectSectionComponent implements OnInit {
  //inputs
  @Input() section: ControlName;
  @Input() selectedProject: Project;

  controlFieldKeys: string[];
  controlFields: any;
  fieldSize: number;
  fieldType: string;
  fieldName: string;

  constructor(
    private formDataConfigService: FormDataConfigService,
    private projectDataService: ProjectsDataService,
  ) {}

  ngOnInit() {
    this.fieldName = this.section.dataFieldName;
    if (this.isArray(this.selectedProject[this.fieldName])) {
      if (this.selectedProject[this.fieldName])
        this.fieldSize = this.selectedProject[this.fieldName].length;
      else this.fieldSize = undefined;
    } else {
      this.fieldSize = undefined;
    }

    this.controlFields = this.formDataConfigService.getFormConfig(
      this.fieldName,
    );
    this.fieldType = this.controlFields.controlName.type;
    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);
  }

  isArray(data: any): boolean {
    if (this.fieldType == 'array' && Array.isArray(data)) return true;
    else return false;
  }
  editData(index?) {
    console.log(index);
  }

  addData() {
    console.log('add');
  }
  deleteAllData() {
    if (confirm('Delte All Data')) {
      this.projectDataService.deleteAllData(
        this.projectDataService.projectsCollectionRef.doc(
          this.selectedProject.id,
        ),
        this.fieldName,
      );
    }
  }
}
