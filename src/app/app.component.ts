import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appName = 'מנהל הפרוקטים';
  isUserSignIn = false;
  userId:string="";
  collectionName: string = 'projects';
  projects: Observable<Project[]> = new Observable<Project[]>();
  selectedProject?:Project;
  isSideOpen = false;
  isReg = false;
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) {
    this.projects = firestore
      .collection('users').doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2').collection(this.collectionName)
      .valueChanges() as Observable<Project[]>;
  }
  ngOnInit() {
    this.projects.subscribe((p)=>{
      console.log(p);
    })
    this.auth.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
        this.userId = user.uid;
        this.isUserSignIn = true;
      } else {
        this.isUserSignIn = false;
        this.router.navigate(['/', 'sign-in']);
      }
    });
  }
  addItem() {
    let newProj: Project = {
      name: 'myName',
      desc: 'my descripthion',
      lifecycleStage: 'planning',
      startTime: '07/05/2021',
      tools: [{ name: 'angular', desc: 'hhhh',ver:"1.1.1" }],
    };
    this.firestore.collection("users").doc(this.userId).collection(this.collectionName).add(newProj);
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

  onSelectProject(selectedProject:Project){
    this.selectedProject = selectedProject;
  }
}
