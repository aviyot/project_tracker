import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnChanges {
  @Input() editable: boolean = false;
  projects: Project[];
  selectedProject: Project;
  @Input() detial: boolean;
  @Input() selectedProjectIndex: number;
  @Input() addNewProject: boolean;
  docRef;
  showFullPath = false;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((user) => {
      if (user) {
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
      }
    });
  }
  ngOnInit() {}
  ngOnChanges(change: SimpleChanges) {
    if (
      change.selectedProjectIndex.previousValue !==
        change.selectedProjectIndex.currentValue &&
      change.selectedProjectIndex.previousValue
    )
      this.selectedProject = { ...this.projects[this.selectedProjectIndex] };
  }
  onItemSelected(selectedIndex) {
    console.log(selectedIndex);

    if (selectedIndex !== null || selectedIndex !== undefined) {
      this.projects.forEach((project, i) => {
        if (selectedIndex === i) this.selectedProject = project;
      });
    } else {
      this.addNewProject = true;
    }
  }
}
