import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate } from '../model/authenticate';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  authUser!:Authenticate;

  constructor(private userService:UserService,private userAuthService:UserAuthService,private router:Router) { }

  ngOnInit(): void {
    this.authUser=new Authenticate();
  }

  authenticate(){
    this.userService.authenticate(this.authUser).subscribe(
      (response:any)=>{
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRole(response["user"]["role"]);
        let role=response["user"]["role"];
        if(role==='admin'){
          this.router.navigate(['/admin']);
        }
        else if(role==='employe'){
          this.router.navigate(['/employe']);
        }
        else{
          this.router.navigate(['/company']);
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
