import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${productId}`);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, productData);
  }

  getAll(params?: any): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.get(`${this.baseUrl}`, { params: httpParams });
  }

  search(term: string, params: any): Observable<any> {
  const queryParams = new HttpParams({ fromObject: params });

  return this.http.get(`${this.baseUrl}/search/${term}`, { params: queryParams });
}
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(productId: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${productId}`, product);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/category/${categoryId}`);
}
}