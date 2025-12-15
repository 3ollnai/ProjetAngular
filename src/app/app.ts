import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs';
import { selectIsAuthenticated } from './state/auth/auth.selectors';
import { logout } from './state/auth/auth.actions';
import { loadCartFromStorage } from './state/cart/cart.actions';
import { loadCartFromStorage as loadCartFromStorageUtil } from './state/cart/cart.effects';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, CartIconComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('my-shop');
  protected readonly isAuthenticated$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated).pipe(startWith(false));
  }

  ngOnInit(): void {
    // Load cart from localStorage on app init
    const storedCart = loadCartFromStorageUtil();
    if (storedCart) {
      this.store.dispatch(loadCartFromStorage({ items: storedCart }));
    }
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/app/login']);
  }
}
