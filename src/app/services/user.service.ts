import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {
  }
  getUser(): any{
    return this.http.get(this.baseUrl);
  }
  getUserById(id): any{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  editUserById(id: any, user: any): any {
    return this.http.put(`${this.baseUrl}/${id}`, user );
  }
  createUser(user: any): any {
    return this.http.post(this.baseUrl, user);
  }
  deleteUserById(id): any{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getUserByCustomerId(id): any {
    return this.http.get(`${this.baseUrl}/${id}/customer`);
  }
}
