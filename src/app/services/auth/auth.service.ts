import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url="http://localhost:8087";
  creds:{
    userName:string,
    userPassword:string
  }

  constructor(private http : HttpClient) { }

  auth(){
    console.log("appel auth");
    
   return  this.http.post(this.url+"/SpringMVC/authenticate",
   {
      "userName":"issam22ba@gmail.com",
      "userPassword":"123456"
    }
    );
  }
}
