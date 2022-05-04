import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Registration } from '../model/registration';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  messageError:string='zzz';
  hiddenMessageError:boolean=true;
  userRegistration!:Registration;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userRegistration=new Registration();
  }

  registration(){
    this.userService.register(this.userRegistration).subscribe(
      (response)=>{
        console.log("registration success");
        this.hiddenMessageError=false;
        this.messageError=response;
      },
      (error)=>{
        console.log(error);
        this.hiddenMessageError=false;
        this.messageError="error registration";
      }
    );
  }

}
