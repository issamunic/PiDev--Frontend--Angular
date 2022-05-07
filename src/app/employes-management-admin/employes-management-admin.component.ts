import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-employes-management-admin',
  templateUrl: './employes-management-admin.component.html',
  styleUrls: ['./employes-management-admin.component.scss']
})
export class EmployesManagementAdminComponent implements OnInit {

  userDialog: boolean;
  users: User[];
  user: User;
  selectedProducts: User[];
  submitted: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.findUsersByRoleEmploye();
  }

  findUsersByRoleEmploye() {
    this.userService.findUsersByRole("employe").subscribe((response: any) => {
      this.users = response;
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        if (response[i]['profession'] != null) {
          this.users[i]['profession'] = response[i]['profession']['name'];
        }
        this.users[i]['FirstNameEmploye'] = response[i]['firstNameEmploye'];
        this.users[i]['LastNameEmploye'] = response[i]['lastNameEmploye'];
        this.users[i]['BirthDateEmploye'] = response[i]['birthDateEmploye']
        this.users[i]['login'] = response[i]['login'];
        this.users[i]['idUser'] = response[i]['idUser'];
      }
    });
  }

  onSearchCustomer(event: any) {
    //console.log(event.target.value);
    //this.users=null;
    if (event.target.value === '') {
      this.findUsersByRoleEmploye();
    }
    else {
      this.userService.searchEmployesByName(event.target.value).subscribe((response: any) => {
        this.users = response;
        for (let i = 0; i < response.length; i++) {
          if (response[i]['profession'] != null) {
            this.users[i]['profession'] = response[i]['profession']['name'];
          }
          this.users[i]['FirstNameEmploye'] = response[i]['firstNameEmploye'];
          this.users[i]['LastNameEmploye'] = response[i]['lastNameEmploye'];
          this.users[i]['BirthDateEmploye'] = response[i]['birthDateEmploye']
          this.users[i]['login'] = response[i]['login'];
          this.users[i]['idUser'] = response[i]['idUser'];
        }
      });
    }

  }

}
