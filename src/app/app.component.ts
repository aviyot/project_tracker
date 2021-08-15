import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Project } from 'src/models/project.model';
import { MatDrawer } from '@angular/material/sidenav';
import firebase from 'firebase/app';
import { FormAction } from 'src/types/form-action.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appName = 'מנהל הפרויקטים';
  isUserSignIn = false;
  user: firebase.User = null;
  userSignIn: 'LOAD' | 'SIGNIN' | 'INABLE_SIGNIN' | 'ERROR' = 'LOAD';
  itemSelected = false;
  collectionName: string = 'projects';
  selectedProject?: Project;
  isSideOpen = false;
  isReg = false;
  selectedProjectIndex = null;
  @ViewChild('sideNav') sideNav: MatDrawer;

  addNewProject = false;

  constructor(private auth: AngularFireAuth) {}
  ngOnInit() {
    this.auth.user.subscribe(
      (user) => {
        this.user = user;
        if (user) {
          this.userSignIn = 'SIGNIN';
        } else {
          this.userSignIn = 'INABLE_SIGNIN';
        }
      },
      () => {
        this.userSignIn = 'ERROR';
      }
    );
  }
  onItemSelected(itemIndex) {
    if (itemIndex) this.selectedProjectIndex = itemIndex;
    else {
      this.addNewProject = true;
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
