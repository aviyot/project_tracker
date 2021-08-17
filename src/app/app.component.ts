import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/models/project.model';
import { MatDrawer } from '@angular/material/sidenav';
import { FormAction } from 'src/types/form-action.type';
import { AuthService } from './auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appName = 'מנהל הפרויקטים';
  selectedProject: Project;
  projects: Project[];
  docRef;
  isUserSignIn = false;
  userSignIn: 'LOAD' | 'SIGNIN' | 'INABLE_SIGNIN' | 'ERROR' = 'LOAD';
  itemSelected = false;
  addNewProject = false;

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
          this.docRef = this.firestore
            .collection('users')
            .doc(user.uid)
            .collection('projects', (ref) => ref.orderBy('projectDesc.name'));

          (
            this.docRef.valueChanges({
              idField: 'id',
            }) as Observable<Project[]>
          ).subscribe((projects) => {
            this.projects = projects;
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
  onItemSelected(itemIndex: number) {
    this.selectedProject = { ...this.projects[itemIndex] };
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
