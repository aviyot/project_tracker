import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/models/project.model';
import { FormAction } from 'src/types/form-action.type';
import { AuthService } from './auth/auth.service';
import { ListAction } from 'src/models/list-action';
import { ProjectsDataService } from './services/projects/projects-data.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appName = 'מנהל הפרויקטים';
  selectedProject: Project | null = null;
  projects: Project[] = [];
  projectsCollectionRef: AngularFirestoreCollection;
  isUserSignIn = false; //not used
  userSignIn: 'LOAD' | 'SIGNIN' | 'INABLE_SIGNIN' | 'ERROR' = 'LOAD'; //user login status
  itemSelected = false; //not used
  addNewProject = false;
  itemIndex = 0;
  projectSection: number;
  isFristTimeProjectsFetch: boolean = true;

  constructor(
    private authService: AuthService,
    private projectsDataService: ProjectsDataService
  ) {}
  ngOnInit() {
    this.authService.user.subscribe(
      (user) => {
        if (user) {
          this.userSignIn = 'SIGNIN';
          this.projectsCollectionRef =
            this.projectsDataService.projectsCollectionRef;
          this.projectsDataService.projects$.subscribe((data) => {
            if (this.isFristTimeProjectsFetch) {
              this.isFristTimeProjectsFetch = false;
              //frist time load
              if (data.length) {
                this.projects = [...data];
                this.selectedProject = {
                  ...this.projects[this.itemIndex],
                };
              } else {
                this.projects = [];
                this.selectedProject = null;
              }
            } else {
              //not frist time load

              if (data.length === this.projects.length) {
                //Update
              }
              if (data.length > this.projects.length) {
                // Add
                this.itemIndex = data.length - 1;
              }
              if (data.length < this.projects.length) {
                //delete
                this.itemIndex = 0;
              }
              this.projects = [...data];
              this.selectedProject = {
                ...this.projects[this.itemIndex],
              };
            }
          });
        } else {
          this.userSignIn = 'INABLE_SIGNIN';
        }
      },
      () => {
        this.userSignIn = 'ERROR';
      }
    );
  }
  onItemSelected(listAction: ListAction) {
    if (listAction.action == 'VIEW_ITEM') {
      this.selectedProject = { ...this.projects[listAction.item] };
      this.itemIndex = listAction.item;
      switch (listAction.section) {
        case 'projectDesc':
          this.projectSection = 0;
          break;
        case 'tools':
          this.projectSection = 1;
          break;
        case 'features':
          this.projectSection = 2;
          break;
        case 'todos':
          this.projectSection = 3;
          break;
        case 'howTodos':
          this.projectSection = 4;
          break;
        case 'challenges':
          this.projectSection = 5;
          break;
        case 'workTimes':
          this.projectSection = 6;
          break;

        default:
          break;
      }
    }

    if (listAction.action == 'ADD_ITEM') this.addNewProject = true;

    if (listAction.action == 'VIEW_ITEMS') {
      this.selectedProject = null;
      this.addNewProject = false;
    }
  }

  onFormAction(event: FormAction) {
    switch (event) {
      case 'ADD':
        this.addNewProject = true;
        break;
      case 'ADD_EXIT':
        this.addNewProject = false;
        break;
      case 'EXIT':
        this.addNewProject = false;
        break;
      default:
        this.addNewProject = false;
        break;
    }
  }
}
