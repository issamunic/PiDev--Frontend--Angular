import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role:string){
    localStorage.setItem("role",role);
  }

  public getRole(){
    return localStorage.getItem("role");
  }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken(){
    return localStorage.getItem("jwtToken");
  }

  public clear(){
    localStorage.clear();//pour supprimer les donnees du local storage (pour logout)
  }

  public isLoggedIn(){
    return this.getRole() && this.getToken();//true if user connected, false if user is not connected(logout)
  }
}
