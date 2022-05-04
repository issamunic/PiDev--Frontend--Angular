import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../api/appconfig";
import {Subscription} from "rxjs";
import {ConfigService} from "../service/app.config.service";
import {SignUpEmployeeService} from "../services/houssem/sign-up-employee.service";

@Component({
  selector: 'app-sign-up-employee',
  templateUrl: './sign-up-employee.component.html',
    styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})

export class SignUpEmployeeComponent implements OnInit {
    valCheck: string[] = ['remember'];

    password: string;

    config: AppConfig;

    subscription: Subscription;
    msg: any;
    codeinput: any;
    emailinput: any;
    passwordinput: any;

    constructor(public configService: ConfigService,public servicesignup:SignUpEmployeeService){ }

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
    signup() {
        console.log("rzzzq*dlqsmflqmdfù");
        // @ts-ignore
       return  this.servicesignup.SignupEmplyee({login: this.emailinput,nameCompany: this.emailinput,password: this.passwordinput,username: this.emailinput},this.codeinput).subscribe(res=>console.log(res));

    }
}
