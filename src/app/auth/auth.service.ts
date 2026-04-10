import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  get user(): Observable<firebase.User | null> {
    return this.auth.authState;
  }

  signInWithEmail(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    return this.auth.signOut();
  }
}
