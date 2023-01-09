import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ListAction } from 'src/models/list-action';
import { Project } from 'src/models/project.model';
import { FormAction } from 'src/types/form-action.type';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
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

  onItemSelected(listAction: ListAction) {
    this.itemSelected.emit(listAction);
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
