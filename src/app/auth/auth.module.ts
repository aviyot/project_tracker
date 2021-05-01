import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from 'src/environments/environment';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, LoginComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebase,
      () => 'your_app_name_factory',
      environment.uiConfig
    ),
    MatPasswordStrengthModule,
  ],
  exports: [SignInComponent, SignUpComponent, LoginComponent],
})
export class AuthModule {}
