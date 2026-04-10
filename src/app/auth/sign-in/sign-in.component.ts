import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  form: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async signIn() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    try {
      await this.authService.signInWithEmail(
        this.form.value.email,
        this.form.value.password,
      );
    } catch (e: any) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }

  async signInWithGoogle() {
    this.error = null;
    try {
      await this.authService.signInWithGoogle();
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
