import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductsQuery, PaginatedProducts } from '../state/products/products.actions';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RefreshRequest {
  refresh: string;
}

export interface RefreshResponse {
  access: string;
}

export interface RatingResponse {
  product_id: number;
  avg_rating: number;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/token/`, { username, password });
  }

  refreshToken(refresh: string): Observable<RefreshResponse> {
    return this.http.post<RefreshResponse>(`${this.apiUrl}auth/token/refresh/`, { refresh });
  }

  getProducts(query: ProductsQuery): Observable<PaginatedProducts> {
    let params = new HttpParams()
      .set('page', query.page.toString())
      .set('page_size', query.pageSize.toString());
    
    if (query.minRating !== undefined) {
      params = params.set('min_rating', query.minRating.toString());
    }
    
    if (query.ordering) {
      params = params.set('ordering', query.ordering);
    }

    return this.http.get<PaginatedProducts>(`${this.apiUrl}products/`, { params });
  }

  getProductRating(id: number): Observable<RatingResponse> {
    return this.http.get<RatingResponse>(`${this.apiUrl}products/${id}/rating/`);
  }
}

