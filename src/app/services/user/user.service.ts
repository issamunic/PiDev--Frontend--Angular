import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate } from 'src/app/model/authenticate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_API="http://localhost:8087/SpringMVC";

  requestHeader=new HttpHeaders({"No-Auth":"True"});

  constructor(private httpClient:HttpClient) { }

  authenticate(userAuth:Authenticate){
    return this.httpClient.post(this.PATH_API+"/authenticate", userAuth, {headers:this.requestHeader});
  }
}
