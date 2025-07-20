import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  placeOrder(orderData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/place-order`, orderData);
}
  getOrders(userId: any): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrl}/orders/user/${userId}`);
}


  saveAddress(address: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/address`, address);
}

getCurrentUserAddresses(page: number, pageSize: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/addresses?page=${page}&size=${pageSize}`);
}

}