import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class tasaService {
  baseUrl = 'http://localhost:3000/rate';
  constructor(private http: HttpClient) {
  }
  getTasa(): any{
  return this.http.get(this.baseUrl);
}
}
