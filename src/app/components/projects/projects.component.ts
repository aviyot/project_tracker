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

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnChanges {
  @Input() projects: Project[];
  @Input() selectedProject: Project;
  @Input() selectedProjectIndex: number;
  @Input() addNewProject;
  @Input() docRef;
  @Output() formAction = new EventEmitter<FormAction>();
  @Output() itemSelected = new EventEmitter<ListAction>();

  constructor() {}
  ngOnInit() {}
  ngOnChanges(change: SimpleChanges) {
    /*    if (change.selectedProjectIndex) {
      if (
        change.selectedProjectIndex.previousValue !==
          change.selectedProjectIndex.currentValue &&
        change.selectedProjectIndex.previousValue
      )
        this.selectedProject = {
          ...this.projects[this.selectedProjectIndex],
        };
    } */
  }
  onItemSelected(listAction: ListAction) {
    this.itemSelected.emit(listAction);
    /*   if (selectedIndex !== null || selectedIndex !== undefined) {
      this.projects.forEach((project, i) => {
        if (selectedIndex === i) this.selectedProject = project;
      });
    } */
  }

  onFormAction(event: FormAction) {
    this.formAction.emit(event);
  }
}
