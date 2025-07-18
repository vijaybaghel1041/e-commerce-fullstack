import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addToCart(userId: number, product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}`, product);
  }

  removeFromCart(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${productId}`);
  }
}