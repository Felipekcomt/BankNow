import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FechaService {
  baseUrl = 'http://localhost:3000/fecha';
  constructor(private http: HttpClient) {
  }
  getFecha(): any{
    return this.http.get(this.baseUrl);
  }
  editFechaById(id: any, fecha: any): any {
    return this.http.put(`${this.baseUrl}/${id}`, fecha );
  }
  getFechaById(id): any{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
