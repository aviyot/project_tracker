import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GetDocRefService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}
  getDocRef(projectId: string) {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.firestore.collection('users').doc(user.uid).collection('projects')
          .doc[projectId];
      }
    });
  }

  //check get doc Ref by array of path
  getRef(docPath: string[]) {
    if (docPath.length < 1) {
      return this.firestore[docPath[0]];
    }
    let path = docPath.splice(0, 1);
    this.getRef(docPath);
    return this.firestore[path[0]];
  }
}
