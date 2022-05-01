import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    
    items: MenuItem[];

    constructor(public appMain: AppMainComponent,private userAuthService:UserAuthService,
        private router:Router,
        public userService:UserService) 
        { }

    public isLoggedIn(){
        return this.userAuthService.isLoggedIn();
    }

    public logOut(){
        this.userAuthService.clear();
        this.router.navigate(['/home']);
    }    
    
}
