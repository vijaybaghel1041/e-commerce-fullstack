import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// Update the import path if your environment file is located elsewhere
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/cart`;

  private cartChangeSubject = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}


  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addToCart(userId: number, product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}`, product).pipe(
      // Notify subscribers after adding to cart
      // tap is not imported yet, so add it if needed in your usage
      // tap(() => this.notifyCartChanged())
    );
  }

  deleteProduct(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${productId}`);
    // You can also notify here if needed
  }

  notifyCartChanged() {
    this.cartChangeSubject.next();
  }

  onCartChange(): Observable<void> {
    return this.cartChangeSubject.asObservable();
  }

   deleteFromCart(cartId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${cartId}/product/${productId}`);
  }

  updateQuantity(productId: number, action: 'inc' | 'dec'): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateQuantity`, {
      productId,
      action
    });
  }
}