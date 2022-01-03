import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/models/project.model';
import { MatDrawer } from '@angular/material/sidenav';
import { FormAction } from 'src/types/form-action.type';
import { AuthService } from './auth/auth.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListAction } from 'src/models/list-action';
import { ProjectData } from 'src/models/project-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appName = 'מנהל הפרויקטים';
  selectedProject: Project | null = null;
  projects: Project[] = [];
  projects$: Observable<Project[]>;
  projectsCollectionRef: AngularFirestoreCollection;
  isUserSignIn = false; //not used
  userSignIn: 'LOAD' | 'SIGNIN' | 'INABLE_SIGNIN' | 'ERROR' = 'LOAD'; //user login status
  itemSelected = false; //not used
  addNewProject = false;
  itemIndex = 0;
  projectSection: number;
  isFristTimeProjectsFetch: boolean = true;

  @ViewChild('sideNav') sideNav: MatDrawer;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.user.subscribe(
      (user) => {
        if (user) {
          this.userSignIn = 'SIGNIN';
          this.projectsCollectionRef = this.firestore
            .collection('users')
            .doc(user.uid)
            .collection('projects', (ref) => ref.orderBy('projectDesc.name'));

          this.projects$ = this.projectsCollectionRef.snapshotChanges().pipe(
            map((actions) => {
              return actions.map((a) => {
                const data = a.payload.doc.data() as ProjectData;
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
          this.projects$.subscribe((data) => {
            if (this.isFristTimeProjectsFetch) {
              console.log('Frist Time');

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
              console.log('No Frist Time');
              //not frist time load
              if (data.length === this.projects.length) {
                console.log('UPDATE');
              }
              if (data.length > this.projects.length) {
                console.log('ADDED');

                this.itemIndex = data.length - 1;
              }
              if (data.length < this.projects.length) {
                console.log('DELETE');

                this.itemIndex = 0;
              }

              console.log(this.projects.length);

              this.projects = [...data];
              this.selectedProject = {
                ...this.projects[this.itemIndex],
              };
            }
          });
          /* 
          (
            this.projectsCollectionRef.valueChanges({
              idField: 'id',
            }) as Observable<Project[]>
          ).subscribe((projects) => {
            //check if added new projects
            if (this.projects && projects.length) {
              //item edited
              if (projects.length == this.projects.length)
                this.selectedProject = { ...projects[this.itemIndex] };
              //new iten addes
              if (projects.length !== this.projects.length)
                this.selectedProject = null;

              this.projects = projects;
          
            } else if (projects.length) {
              this.projects = projects;
              this.itemIndex = 0;

              this.selectedProject = {
                ...projects[this.itemIndex],
              };
            }
          });
 */
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

    this.sideNav.close();
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
