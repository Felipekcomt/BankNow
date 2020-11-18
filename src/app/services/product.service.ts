import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {
  }
  getProduct(): any{
    return this.http.get(this.baseUrl);
  }
  getProductById(id): any{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  editProductById(id: any, product: any): any {
    return this.http.put(`${this.baseUrl}/${id}`, product );
  }
  createProduct(product: any): any {
    return this.http.post(this.baseUrl, product);
  }
}
