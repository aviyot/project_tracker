import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ListAction } from 'src/models/list-action';
import { Project } from 'src/models/project.model';
import { FormAction } from 'src/types/form-action.type';
import { ProjectSection } from 'src/types/project-sections.type';

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
  @Input() projectSection: number;
  @Input() projectsCollectionRef: AngularFirestoreCollection;
  @Input() itemIndex: number;
  @Output() formAction = new EventEmitter<FormAction>();
  @Output() itemSelected = new EventEmitter<ListAction>();
  isShowAllProjects: boolean = false;

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

    // this.itemIndex = listAction.item;

    /*   if (selectedIndex !== null || selectedIndex !== undefined) {
      this.projects.forEach((project, i) => {
        if (selectedIndex === i) this.selectedProject = project;
      });
    } */
  }
  selectProjectName(action: ListAction) {
    this.itemSelected.emit({ action: action.action, item: action.item });
    this.itemIndex = action.item;
    this.projectSection = 0;
    if (action.action === 'CLOSE_ITEM') {
      this.isShowAllProjects = false;
    }
  }
  onFormAction(event: FormAction) {
    this.formAction.emit(event);
    if (event === 'EXIT') {
      this.addNewProject = false;
    }
  }

  showAllProjects() {
    this.isShowAllProjects = true;
  }
}
