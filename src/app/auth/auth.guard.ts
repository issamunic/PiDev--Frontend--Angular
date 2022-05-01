import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService:UserAuthService,
    private router:Router,
    private userService:UserService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userAuthService.getToken()!==null){
      let userRole=route.data["role"]as Array<string>;
      //let role=[userRole];
      //const role=route.data["role"] as Array<string>;
      if(userRole){
        const match = this.userService.roleMatch(userRole);
        if(match){
          return true;
        }else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    this.router.navigate(['/authenticate']);
    return false;
  }
  
}
