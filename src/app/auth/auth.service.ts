import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

_user:Observable<any> = new Observable();
  constructor(private auth: AngularFireAuth) {
   }

   get user():Observable<any>{
    return this.auth.user;
  }
}

