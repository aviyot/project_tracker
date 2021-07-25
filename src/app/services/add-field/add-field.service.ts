import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AddFieldService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  addFiled() {
    this.auth.user.subscribe((user) => {
      let collectionRef: AngularFirestoreCollection<firebase.firestore.DocumentData> =
        this.firestore.collection('users').doc(user.uid).collection('projects');

      collectionRef.get().subscribe((doc) => {
        doc.docs.forEach((doc) => {
          collectionRef
            .doc(doc.id)
            .update({
              'projectDesc.sites': [],
            })
            .then(() => {
              console.log('Document successfully updated!');
            });
        });
      });
    });
  }
}
