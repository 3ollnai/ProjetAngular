import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <mat-card class="login-card">
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Username</mat-label>
            <input matInput [(ngModel)]="username" name="username" required />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput type="password" [(ngModel)]="password" name="password" required />
          </mat-form-field>

          @if (error) {
            <div class="error-message">{{ error }}</div>
          }

          <button mat-raised-button color="primary" type="submit" [disabled]="loading" class="full-width">
            @if (loading) {
              <mat-spinner diameter="20" class="inline-spinner"></mat-spinner>
            } @else {
              Login
            }
          </button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .login-card {
        width: 100%;
        max-width: 400px;
      }

      .full-width {
        width: 100%;
        margin-bottom: 1rem;
      }

      .error-message {
        color: #f44336;
        margin-bottom: 1rem;
        font-size: 0.875rem;
      }

      .inline-spinner {
        display: inline-block;
        margin-right: 0.5rem;
      }

      mat-card-content {
        padding-top: 1rem;
      }
    `,
  ],
})
export class LoginFormComponent {
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() submit = new EventEmitter<{ username: string; password: string }>();

  username = 'demo';
  password = 'demo';

  onSubmit(): void {
    this.submit.emit({ username: this.username, password: this.password });
  }
}

