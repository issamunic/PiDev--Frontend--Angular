import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = "http://localhost:8087/SpringMVC/";
  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    return this.http.get<any>(this.url + "user/getListOfUser", { headers: headers });
  }


}
