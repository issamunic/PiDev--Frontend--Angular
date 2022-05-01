import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate } from 'src/app/model/authenticate';
import { UserAuthService } from '../user-auth/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_API="http://localhost:8087/SpringMVC";

  requestHeader=new HttpHeaders({"No-Auth":"True"});

  constructor(private httpClient:HttpClient,private userAuthService:UserAuthService) { }

  authenticate(userAuth:Authenticate){
    return this.httpClient.post(this.PATH_API+"/authenticate", userAuth, {headers:this.requestHeader});
  }

  /*roleMatch(allowedRoles):boolean{
    let isMatch=false;
    let role:string=this.userAuthService.getRole();
    if(role!=null && role){
      for(let i=0;i<allowedRoles.length;i++){
        if(role===allowedRoles[i]){
          isMatch=true;
          return isMatch;
        }
      }
    }
    return isMatch;
  }*/

  roleMatch(allowedRoles):boolean{
    let isMatch=false;
    let role:string=this.userAuthService.getRole();
    if(role!=null && role){
      for(let i=0;i<allowedRoles.length;i++){
        if(role===allowedRoles[i]){
          isMatch=true;
          return isMatch;
        }
      }
    }
    return isMatch;
  }
}
