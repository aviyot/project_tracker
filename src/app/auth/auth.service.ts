import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _user: Observable<any> = new Observable();
  constructor(private auth: AngularFireAuth) {}

  get user(): Observable<firebase.User> {
    return this.auth.user;
  }
}
