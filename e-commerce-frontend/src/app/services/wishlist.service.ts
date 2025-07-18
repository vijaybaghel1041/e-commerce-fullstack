import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = `${environment.apiUrl}/wishlist`;

  constructor(private http: HttpClient) {}

  getWishlist(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addProductToWishlist(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/${productId}`, {});
  }

  removeProductFromWishlist(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${productId}`);
  }
}