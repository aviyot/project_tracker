import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Start Template : Angular,AngularFire,AngularMaterial';
  items: Observable<any[]>;
  constructor(private firestore: AngularFirestore,public auth: AngularFireAuth) {
    this.items = firestore.collection('items').valueChanges();
  
  }

  addItem() {
      this.firestore.collection("items").add({
      name: "new york",
      country: "Japan"
  }) 
  }

  delItem(){
    this.firestore.collection("items").doc("xBnv53opoIPsLK2Y7q85").delete();
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
}
