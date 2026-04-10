import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ListAction } from 'src/models/list-action';
import { Project } from 'src/models/project.model';
import { FormAction } from 'src/types/form-action.type';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectComponent } from './new-project/new-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnChanges {
  @Input() projects: Project[];
  selectedProject: Project;

  constructor(public dialog: MatDialog) {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.projects && this.projects && this.projects.length > 0) {
      if (!this.selectedProject) {
        this.selectedProject = this.projects[0];
      }
    }
  }
  openDialog() {
    this.dialog.open(NewProjectComponent);
  }

  selectProject(id: string) {
    this.selectedProject = this.projects.find((project) => project.id === id);
  }
}
