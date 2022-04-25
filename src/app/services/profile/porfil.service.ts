import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PorfilService {

  url="http://localhost:8087/SpringMVC/"

  constructor(private http : HttpClient) { }

  getUserInfo(id){

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    
    return this.http.get(this.url+"user/retrieve-user/"+id, { headers:headers });
  }

  getImageByName(name){

  
    var  httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Bearer "+localStorage.getItem('token')

      }),
      responseType: 'text'
    };
    
    return this.http.get(this.url+"image/get/"+name,{ headers:httpOptions.headers, responseType: 'blob' });
  }
}
