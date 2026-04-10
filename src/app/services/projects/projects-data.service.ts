import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectData } from 'src/models/project-data.model';
import { Project } from 'src/models/project.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ProjectsDataService {
  projectsCollectionRef: AngularFirestoreCollection;
  projects = new BehaviorSubject<Project[]>([]);

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) {
    this.authService.user.subscribe((user) => {
      this.projectsCollectionRef = this.firestore
        .collection('users')
        .doc(user.uid)
        .collection('projects', (ref) => ref.orderBy('projectDesc.name'));

      this.projectsCollectionRef
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data() as ProjectData;
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          }),
        )
        .subscribe((projects) => this.projects.next(projects));
    });
  }

  addNewProject(projectName: string): Promise<any> {
    if (this.isProjectNameExit(projectName, this.projects.getValue())) {
      return new Promise((res, rej) => {
        rej('PROJECT NAME EXIT');
      });
    }
    return this.projectsCollectionRef.add({
      projectDesc: {
        name: projectName,
      },
    });
  }

  addData(projectDocRef, formValue, fieldName, dataType): Promise<any> {
    if (dataType == 'array') {
      return projectDocRef.update({
        [fieldName]: firebase.firestore.FieldValue.arrayUnion(formValue),
      });
    } else if (dataType == 'map') {
      return projectDocRef.update({
        [fieldName]: formValue,
      });
    } else {
      return new Promise((resolve, reject) => {
        reject('no find data type');
      });
    }
  }

  removeData(projectDocRef, formValue, fieldName, dataType): Promise<any> {
    if (dataType == 'array') {
      return projectDocRef.update({
        [fieldName]: firebase.firestore.FieldValue.arrayRemove(formValue),
      });
    } else if (dataType == 'map' && fieldName !== 'projectDesc') {
      return projectDocRef.update({
        [fieldName]: firebase.firestore.FieldValue.delete(),
      });
    } else if (dataType == 'map' && fieldName == 'projectDesc') {
      if (confirm(`DANGER : delete ****** ${formValue.name} ****** project ?`))
        return projectDocRef.delete().then(() => {});
      else {
        return new Promise((resolve, reject) => {
          reject('delete canceled');
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject('no find data type');
      });
    }
  }

  updateData(projectDocRef, formValue, fieldName, dataType): Promise<any> {
    if (dataType == 'array') {
      return this.removeData(
        projectDocRef,
        formValue,
        fieldName,
        dataType,
      ).then(() => {
        return projectDocRef.update({
          [fieldName]: firebase.firestore.FieldValue.arrayUnion(formValue),
        });
      });
    } else if (dataType == 'map') {
      return projectDocRef.update({
        [fieldName]: formValue,
      });
    } else {
      return new Promise((resolve, reject) => {
        reject('no find data type');
      });
    }
  }

  deleteAllData(projectDocRef, fieldName) {
    if (confirm('Delte All Data')) {
      projectDocRef.update({
        [fieldName]: firebase.firestore.FieldValue.delete(),
      });
    }
  }

  isProjectNameExit(projectName: string, projects: Project[]): boolean {
    if (projects) {
      return projects.some((project) => {
        return project.projectDesc.name === projectName;
      });
    }
    return false;
  }
}
