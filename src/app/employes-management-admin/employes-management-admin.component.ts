import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-employes-management-admin',
  templateUrl: './employes-management-admin.component.html',
  styleUrls: ['./employes-management-admin.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EmployesManagementAdminComponent implements OnInit {

  userDialog: boolean;
  users: User[];
  user: User;
  selectedProducts: User[];
  submitted: boolean;

  postResponse: any;

  //image: any;

  constructor(private userService: UserService, private confirmationService: ConfirmationService,
    private messageService: MessageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.findUsersByRoleEmploye();
    //this.showImageUser(10);
  }

  /*showImageUser(id) {
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
  }*/

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

        //show image
        this.userService.getObjectImageForUser(response[i]['idUser']).subscribe(res => {
          if (res != null) {
            this.postResponse = res;
            this.users[i]['imageUser'] = 'data:image/jpeg;base64,' + this.postResponse.image;
          } else {
            this.users[i]['imageUser'] = 'assets/public/user.png';
          }
        });
        //end image
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

          //show image
          this.userService.getObjectImageForUser(response[i]['idUser']).subscribe(res => {
            if (res != null) {
              this.postResponse = res;
              this.users[i]['imageUser'] = 'data:image/jpeg;base64,' + this.postResponse.image;
            } else {
              this.users[i]['imageUser'] = 'assets/public/user.png';
            }
          });
          //end image

        }
      });
    }
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  viewUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let i = 0; i < this.selectedProducts.length; i++) {
          //console.log(this.selectedProducts[i]['idUser']);
          this.userService.deleteUser(this.selectedProducts[i]['idUser']).subscribe();
        }
        this.users = this.users.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.FirstNameEmploye + " " + user.LastNameEmploye + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.idUser).subscribe(res => {
          console.log(res);
        });
        this.users = this.users.filter(val => val.idUser !== user.idUser);
        this.user = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      }
    });
  }

}
