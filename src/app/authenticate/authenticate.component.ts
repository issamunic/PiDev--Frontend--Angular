import { Component, OnInit } from '@angular/core';
import { Authenticate } from '../model/authenticate';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  authUser!:Authenticate;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.authUser=new Authenticate();
  }

  authenticate(){
    console.log(this.authUser);
    //alert(this.authUser.userName+" , "+this.authUser.userPassword);
    this.userService.authenticate(this.authUser).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
