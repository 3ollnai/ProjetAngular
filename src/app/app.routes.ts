import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductRatingPageComponent } from './pages/product-rating-page/product-rating-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout/checkout-page.component';
import { OrderTrackingPageComponent } from './pages/order-tracking-page/order-tracking-page.component';
import { OrdersListPageComponent } from './pages/orders-list-page/orders-list-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'app/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  { path: 'app', component: AppPlaceholderComponent },
  { path: 'app/login', component: LoginPageComponent },
  { path: 'app/products', component: ProductsPageComponent, canActivate: [authGuard] },
  { path: 'app/products/:id', component: ProductDetailsPageComponent, canActivate: [authGuard] },
  { path: 'app/cart', component: CartPageComponent, canActivate: [authGuard] },
  { path: 'app/checkout', component: CheckoutPageComponent, canActivate: [authGuard] },
  { path: 'app/orders', component: OrdersListPageComponent, canActivate: [authGuard] },
  { path: 'app/orders/track', component: OrderTrackingPageComponent, canActivate: [authGuard] },
  { path: 'app/orders/track/:orderNumber', component: OrderTrackingPageComponent, canActivate: [authGuard] },
  { path: 'app/rating', component: ProductRatingPageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'app/login' },
];
