import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthService:UserAuthService,
    private router:Router,
    public userService:UserService) { }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logOut(){
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
}
