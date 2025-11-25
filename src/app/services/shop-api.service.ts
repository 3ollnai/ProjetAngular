import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TokenResponse {
  access: string;
  refresh?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  created_at?: string;
  ratings?: any[];
}

export interface ProductsResponse {
  count: number;
  results: Product[];
}

export interface RatingResponse {
  product_id: number;
  avg_rating: number;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class ShopApiService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('/api/auth/token/', { username, password });
  }

  refresh(refresh: string) {
    return this.http.post<TokenResponse>('/api/auth/token/refresh/', { refresh });
  }

  getProducts(params: {
    page?: number;
    page_size?: number;
    min_rating?: number;
    ordering?: string;
  }) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) httpParams = httpParams.set(k, String(v));
    });
    return this.http.get<ProductsResponse>('/api/products/', { params: httpParams });
  }

  getRating(productId: number) {
    return this.http.get<RatingResponse>(`/api/products/${productId}/rating/`);
  }
}
