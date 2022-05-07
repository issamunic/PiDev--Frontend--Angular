import { Component, OnDestroy,OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items: MenuItem[];
    image: any;
    nameUser:string='';

    constructor(public appMain: AppMainComponent, private userAuthService: UserAuthService,
        private router: Router,
        public userService: UserService, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.setCurrentUserImageAndName();
    }

    setCurrentUserImageAndName(){
        this.userService.getCurrentUserAuth().subscribe(res=>{
            this.showImageUser(res['idUser']);
            if(res['role']==='admin'|| res['role']==='employe'){
                this.nameUser=res['firstNameEmploye']+" "+res['lastNameEmploye'];
            }
            else{
                this.nameUser=res['nameCompany'];
            }
        });
    }

    public isLoggedIn() {
        return this.userAuthService.isLoggedIn();
    }

    public logOut() {
        this.userAuthService.clear();
        this.router.navigate(['/home']);
    }

    showImageUser(id) {
        this.userService.getImageUser(id)
            .subscribe((blob: any) => {
                if (blob != null) {
                    if (blob['size'] === 0) {
                        this.image = 'assets/public/user.png';
                    } else {
                        let objectURL = URL.createObjectURL(blob);
                        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                        console.log(this.image);
                    }
                }
            });
    }

}
