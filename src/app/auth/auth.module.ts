import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [SignInComponent, SignUpComponent, LoginComponent],
  imports: [
    CommonModule
  ],
  exports:[SignInComponent, SignUpComponent, LoginComponent]
})
export class AuthModule { }
