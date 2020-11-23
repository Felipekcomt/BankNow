import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'http://localhost:3000/customer';
  constructor(private http: HttpClient) {
  }
  getCustomer(): any{
    return this.http.get(this.baseUrl);
  }
  getCustomerById(id): any{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  editCustomerById(id: any, customer: any): any {
    return this.http.put(`${this.baseUrl}/${id}`, customer );
  }
  createCustomer(customer: any): any {
    return this.http.post(this.baseUrl, customer);
  }
  deleteCustomerById(id): any{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  createMovimientos(movimientos: any): any{
    return this.http.post(this.baseUrl, movimientos);
  }
  getMovimientos(): any{
    return this.http.get(this.baseUrl);
  }

}
