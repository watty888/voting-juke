import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }


  getAddSongs(): Observable<any> {
    return this.http.get('http://localhost:8080/api/addsong', { responseType: 'text' });
  }

  getSongs(): Observable<any> {
    return this.http.get('http://localhost:8080/api/songs', { responseType: 'text' });
  }
}
