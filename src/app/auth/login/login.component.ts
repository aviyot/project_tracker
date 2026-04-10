import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: firebase.User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  signOut() {
    this.authService.signOut();
  }
}
