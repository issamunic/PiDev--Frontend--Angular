import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate } from 'src/app/model/authenticate';
import { Registration } from 'src/app/model/registration';
import { User } from 'src/app/model/user';
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

  register(userRegistration:Registration){
    return this.httpClient.post(this.PATH_API+"/user/process_register", userRegistration, {headers:this.requestHeader,responseType:'text'});
  }

  getAllUsers(){
    return this.httpClient.get(this.PATH_API+"/user/retrieve-all-users");
  }

  findUsersByRole(role:string){
    return this.httpClient.get(this.PATH_API+"/user/retrieve-users-with-role/"+role);
  }

  deleteUser(id:number){
    return this.httpClient.delete(this.PATH_API+"/user/remove-user/"+id,{responseType:'text'});
  }

  searchEmployesByName(name:string){
    return this.httpClient.get(this.PATH_API+"/user/retrieve-employes-by-name/"+name);
  }

  getImageUser(idUser){
    return this.httpClient.get(this.PATH_API+"/user/image/get/"+idUser,{responseType: 'blob'});
  }

  getObjectImageForUser(idUser){
    return this.httpClient.get(this.PATH_API+"/user/image/getObject/" + idUser);
  }

  getCurrentUserAuth(){
    return this.httpClient.get(this.PATH_API+"/getCurrentUserAuth");
  }

  modifyUser(user:User){
    return this.httpClient.put(this.PATH_API+"/user/modifyCurrentUser",user);
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
