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
  appName = "my app";
  isUserSignIn = false;
  collectionName :string = "";
  items: Observable<any[]>;
  isReg = false;
  constructor(private firestore: AngularFirestore,public auth: AngularFireAuth) {
    this.items = firestore.collection(this.collectionName).valueChanges();
  
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
      this.firestore.collection(this.collectionName).add({
      name: "new york",
      country: "Japan"
  }) 
  }

  delItem(){
    this.firestore.collection(this.collectionName).doc("xBnv53opoIPsLK2Y7q85").delete();
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
