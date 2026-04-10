import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
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

  async signUp() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    try {
      await this.authService.signUpWithEmail(
        this.form.value.email,
        this.form.value.password,
      );
    } catch (e: any) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }
}
