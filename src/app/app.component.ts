import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Start Template : Angular,AngularFire,AngularMaterial';
  appName = "my app";
  isUserSignIn = false;
  items: Observable<any[]>;
  isReg = false;
  constructor(private firestore: AngularFirestore,public auth: AngularFireAuth) {
    this.items = firestore.collection('items').valueChanges();
  
  }
   ngOnInit(){
     this.auth.user.subscribe((user)=>{
       if(user){
        this.isUserSignIn = true;
       }
       else {
        this.isUserSignIn = false;
       }
      
     })
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

  register(){
    this.isReg = true;
  }

  loginReq(){
    this.isReg = false;
  }
}
