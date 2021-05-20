import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Observable<Project[]> = new Observable<Project[]>();
  constructor(private firestore: AngularFirestore,private router: Router) { }

  ngOnInit(): void {
   this.projects  = this.firestore.collection('users').doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2').collection("projects")
    .valueChanges({idField: 'id'}) as Observable<Project[]>;
  }

  onSelectProject(selectedProject:Project){
 
   this.router.navigate(['/','app-project',selectedProject.id]);
    
  }

  addNewProject() {
    this.router.navigate(['/', 'new-project']);
  }
}
