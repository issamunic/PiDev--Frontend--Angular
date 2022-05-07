import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-users-management-admin',
  templateUrl: './users-management-admin.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  styleUrls: ['./users-management-admin.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsersManagementAdminComponent implements OnInit {

  userDialog: boolean;
  users: User[];
  user: User;
  selectedProducts: User[];
  submitted: boolean;


  constructor(private userService: UserService, private confirmationService: ConfirmationService, private messageService: MessageService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    //this.listUsers();
    this.findUsersByRoleCompany();
  }

  /*listUsers() {
    this.userService.getAllUsers().subscribe((response: any) => {
      console.log(response);
      this.users = response;
    });
  }*/

  findUsersByRoleCompany() {
    this.userService.findUsersByRole("company").subscribe((response: any) => {
      console.log(response);
      this.users = response;
      console.log(this.users);
      for (let i = 0; i < response.length; i++) {
        if (response[i]['domain'] != null) {
          this.users[i]['domain'] = response[i]['domain']['name'];
        }
        this.users[i]['nameCompany'] = response[i]['nameCompany'];
        this.users[i]['login'] = response[i]['login'];
        this.users[i]['idUser'] = response[i]['idUser'];

        this.userService.getImageUser(response[i]['idUser']).subscribe((blob: any) => {
          if (blob['size'] === 0) {
            this.users[i]['imageUser'] = 'assets/public/user.png';
          }
          else {
            let objectURL = URL.createObjectURL(blob);
            this.users[i]['imageUser'] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });
      }
    });
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
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
      message: 'Are you sure you want to delete the selected companys?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for(let i=0;i<this.selectedProducts.length;i++){
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
      message: 'Are you sure you want to delete ' + user.nameCompany + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.idUser).subscribe(res=>{
          console.log(res);
        });
        this.users = this.users.filter(val => val.idUser !== user.idUser);
        this.user = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      }
    });
  }


}
