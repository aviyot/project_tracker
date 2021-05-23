import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Project } from 'src/models/project.model';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appName = 'מנהל הפרויקטים';
  isUserSignIn = false;
  user:any="";
  itemSelected = false;
  collectionName: string = 'projects';
  projects: Observable<Project[]> = new Observable<Project[]>();
  selectedProject?:Project;
  isSideOpen = false;
  isReg = false;
  @ViewChild('sideNav') sideNav:MatDrawer;
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.projects.subscribe((p)=>{
      console.log(p);
    })
    this.auth.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
        this.user = user;
        this.isUserSignIn = true;
      } else {
        this.isUserSignIn = false;
        this.router.navigate(['/', 'sign-in']);
      }
    });
  }

  delItem() {
    this.firestore
      .collection(this.collectionName)
      .doc('xBnv53opoIPsLK2Y7q85')
      .delete();
  }

  openSide(){
    this.isSideOpen = !this.isSideOpen;
  }

  onItemSelected(){
    this.sideNav.close();
    }
 
}
