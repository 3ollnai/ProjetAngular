import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form.component';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, LoginFormComponent],
  template: `
    <div style="padding:20px">
      <h3>Login</h3>
      <app-login-form (submitForm)="onSubmit($event)"></app-login-form>
    </div>
  `,
})
export class LoginPageComponent {
  onSubmit(payload: { username: string; password: string }) {
    console.log('Login submitted:', payload);
    alert(`Login: ${payload.username}/${payload.password}`);
  }
}
