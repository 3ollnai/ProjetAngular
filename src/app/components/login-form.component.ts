import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="login-form" style="display:flex; flex-direction:column; gap:10px; max-width:300px">
      <div>
        <label>Username</label>
        <input formControlName="username" style="display:block; width:100%; padding:8px; border:1px solid #ccc" />
      </div>

      <div>
        <label>Password</label>
        <input type="password" formControlName="password" style="display:block; width:100%; padding:8px; border:1px solid #ccc" />
      </div>

      <button type="submit" style="padding:10px; background:#007bff; color:white; border:none; cursor:pointer">Login</button>
    </form>
  `,
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<{ username: string; password: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ username: ['demo'], password: ['demo'] });
  }

  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      if (username && password) {
        this.submitForm.emit({ username, password });
      }
    }
  }
}
