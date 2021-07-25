import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { ProjectData } from 'src/models/project-data.model';

@Injectable({
  providedIn: 'root',
})
export class DataStructureService {
  user: firebase.User;
  newStructure: ProjectData;
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  deleteFields() {
    this.auth.user.subscribe((user) => {
      this.user = user;
      let collectionRef: AngularFirestoreCollection<firebase.firestore.DocumentData> =
        this.firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('projects');

      collectionRef.get().subscribe((doc) => {
        doc.docs.forEach((doc) => {
          collectionRef
            .doc(doc.id)
            .update({
              capital: firebase.firestore.FieldValue.delete(),
              name: firebase.firestore.FieldValue.delete(),
              desc: firebase.firestore.FieldValue.delete(),
              startTime: firebase.firestore.FieldValue.delete(),
              endTime: firebase.firestore.FieldValue.delete(),
              lifecycleStage: firebase.firestore.FieldValue.delete(),
              gitHub: firebase.firestore.FieldValue.delete(),
              site: firebase.firestore.FieldValue.delete(),
              filePath: firebase.firestore.FieldValue.delete(),
            })
            .then(() => {
              console.log('updated');
            });
        });
      });
    });
  }
  changeDataStructure() {
    this.auth.user.subscribe((user) => {
      this.user = user;
      let collectionRef: AngularFirestoreCollection<firebase.firestore.DocumentData> =
        this.firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('projects');

      collectionRef.get().subscribe((doc) => {
        doc.docs.forEach((doc) => {
          if (!doc.data().projectDesc) {
            console.log(doc.data());

            this.newStructure = {
              projectDesc: {
                name: doc.data().name,
                desc: doc.data().desc,
                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                lifecycleStage: doc.data().lifecycleStage,
                gitHub: doc.data().gitHub,
                site: doc.data().site,
                sites: doc.data().sites,
                filePath: doc.data().filePath,
              },
              features: doc.data().features,
              questions: doc.data().questions,
              todos: doc.data().todos,
              tools: doc.data().tools,
              workTimes: doc.data().workTimes,
            };

            console.log(this.newStructure);

            /*  collectionRef.doc(doc.id).update(this.newStructure).then(()=>{
            console.log("updated");
          }); */
          }
        });
      });
    });
  }
}
