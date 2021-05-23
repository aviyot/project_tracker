import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Observable<Project[]> = new Observable<Project[]>();
  @Output() itemSelected  = new EventEmitter();
  constructor(private firestore: AngularFirestore,private router: Router) { }

  ngOnInit(): void {
   this.projects  = this.firestore.collection('users').doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2').collection("projects")
    .valueChanges({idField: 'id'}) as Observable<Project[]>;
  }

  onSelectProject(selectedProject:Project){
    this.itemSelected.emit();
   this.router.navigate(['/','app-project',selectedProject.id]);

  }

  addNewProject() {
 
    this.router.navigate(['/', 'new-project']);
  }
}
