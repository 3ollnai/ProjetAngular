import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs';
import { login } from '../../state/auth/auth.actions';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../../state/auth/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <!-- Debug: Login page loaded -->
    <section class="auth-page">
      <div class="brand-panel">
        <div class="badge">Accès sécurisé</div>
        <h1>
          Connectez-vous à <span>My Shop</span>
        </h1>
        <p class="lead">
          Retrouvez vos commandes, vos listes d’envies et vos performances en un clin d’œil, comme dans les meilleures
          maisons de vente en ligne.
        </p>

        <ul class="highlights">
          <li>
            <span class="dot"></span>
            Paiements et retours suivis en temps réel
          </li>
          <li>
            <span class="dot"></span>
            Données chiffrées & support premium 24/7
          </li>
          <li>
            <span class="dot"></span>
            Expérience omnicanale pour vos équipes
          </li>
        </ul>

        <div class="stats">
          <article>
            <strong>48k+</strong>
            <span>Clients actifs</span>
          </article>
          <article>
            <strong>4.9/5</strong>
            <span>Satisfaction</span>
          </article>
        </div>
      </div>

      <div class="form-panel">
        <mat-card class="login-card">
          <mat-card-header>
            <div>
              <p class="eyebrow">Espace client</p>
              <mat-card-title>Connexion sécurisée</mat-card-title>
              <mat-card-subtitle>Identifie-toi pour débloquer le tableau de bord.</mat-card-subtitle>
            </div>
          </mat-card-header>
          <mat-card-content>
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Identifiant</mat-label>
                <input matInput [(ngModel)]="username" name="username" required />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Mot de passe</mat-label>
                <input matInput type="password" [(ngModel)]="password" name="password" required />
              </mat-form-field>

              @if (error$ | async; as error) {
                <div class="feedback error">{{ error }}</div>
              }

              <button
                mat-raised-button
                type="submit"
                [disabled]="loading$ | async"
                class="full-width primary-action"
              >
                @if (loading$ | async) {
                  <mat-spinner diameter="20" class="inline-spinner"></mat-spinner>
                  Chargement
                } @else {
                  Se connecter
                }
              </button>
            </form>
          </mat-card-content>

          <mat-card-footer>
            <div class="form-footer">
              <a href="#">Mot de passe oublié ?</a>
              <span>Besoin d’aide ? support@myshop.com</span>
            </div>
            @if (isAuthenticated$ | async) {
              <div class="feedback success">✓ Connexion réussie, redirection en cours…</div>
            }
          </mat-card-footer>
        </mat-card>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .auth-page {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: clamp(2rem, 5vw, 4rem);
        min-height: calc(100vh - 140px);
        background: linear-gradient(120deg, rgba(116, 67, 255, 0.08), rgba(177, 141, 255, 0.18));
        border-radius: 32px;
        padding: clamp(2rem, 4vw, 4rem);
      }

      .brand-panel {
        background: white;
        border-radius: 28px;
        padding: clamp(2rem, 5vw, 3rem);
        box-shadow: 0 35px 60px rgba(26, 16, 56, 0.08);
        position: relative;
        overflow: hidden;
      }

      .brand-panel::after {
        content: '';
        position: absolute;
        width: 220px;
        height: 220px;
        right: -80px;
        top: -60px;
        background: radial-gradient(circle, rgba(116, 67, 255, 0.35), transparent 65%);
        filter: blur(10px);
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.9rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 600;
        color: #4b2b82;
        background: rgba(116, 67, 255, 0.12);
      }

      h1 {
        font-size: clamp(2.2rem, 4vw, 3rem);
        margin: 1rem 0;
        color: #1a1038;
        line-height: 1.1;
      }

      h1 span {
        color: #7443ff;
      }

      .lead {
        color: #5b4b7a;
        max-width: 480px;
      }

      .highlights {
        list-style: none;
        margin: 2rem 0;
        padding: 0;
        display: grid;
        gap: 0.9rem;
      }

      .highlights li {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        color: #473962;
        font-weight: 500;
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7443ff, #b18dff);
        box-shadow: 0 0 0 6px rgba(116, 67, 255, 0.12);
      }

      .stats {
        display: flex;
        gap: 1.5rem;
      }

      .stats article {
        flex: 1;
        background: rgba(116, 67, 255, 0.08);
        border-radius: 20px;
        padding: 1.2rem;
      }

      .stats strong {
        display: block;
        font-size: 2rem;
        color: #3c2368;
      }

      .stats span {
        color: #6a588a;
      }

      .form-panel {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .login-card {
        width: 100%;
        max-width: 420px;
        border-radius: 28px;
        box-shadow: 0 35px 80px rgba(26, 16, 56, 0.18);
      }

      .eyebrow {
        letter-spacing: 0.2em;
        text-transform: uppercase;
        font-size: 0.75rem;
        color: #a08ad1;
        margin-bottom: 0.4rem;
      }

      mat-card-subtitle {
        color: #6a588a;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        margin-top: 1rem;
      }

      .full-width {
        width: 100%;
      }

      .primary-action {
        height: 52px;
        font-size: 1rem;
        border-radius: 16px;
        background: linear-gradient(135deg, #7443ff, #a064ff);
        box-shadow: 0 18px 30px rgba(116, 67, 255, 0.35);
      }

      .inline-spinner {
        margin-right: 0.75rem;
      }

      .feedback {
        margin-top: -0.5rem;
        font-size: 0.9rem;
      }

      .feedback.error {
        color: #d93025;
      }

      .feedback.success {
        color: #1b9c72;
        margin-top: 1rem;
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        font-size: 0.9rem;
        padding: 1rem 0;
        border-top: 1px solid rgba(105, 80, 143, 0.1);
        margin-top: 1rem;
      }

      .form-footer a {
        color: #7443ff;
        text-decoration: none;
        font-weight: 600;
      }

      @media (max-width: 960px) {
        .auth-page {
          grid-template-columns: 1fr;
        }

        .brand-panel,
        .form-panel {
          max-width: 540px;
          margin: 0 auto;
        }
      }
    `,
  ],
})
export class LoginPageComponent {
  username = 'demo';
  password = 'demo';

  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private router: Router,
    private destroyRef: DestroyRef,
  ) {
    this.loading$ = this.store.select(selectAuthLoading).pipe(startWith(false));
    this.error$ = this.store.select(selectAuthError);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated).pipe(startWith(false));

    this.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Fermer', { duration: 3000 });
      }
    });

    this.isAuthenticated$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isAuth) => {
      if (isAuth) {
        this.snackBar.open('Connexion réussie !', 'Fermer', { duration: 2000 });
        this.router.navigate(['/app/products']);
      }
    });
  }

  onSubmit(): void {
    this.store.dispatch(login({ username: this.username, password: this.password }));
  }
}

