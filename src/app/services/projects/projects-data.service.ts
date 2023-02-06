import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectData } from 'src/models/project-data.model';
import { Project } from 'src/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsDataService {
  projects$: Observable<Project[]>;
  projectsCollectionRef: AngularFirestoreCollection;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {
    this.authService.user.subscribe((user) => {
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
    });
  }
}
