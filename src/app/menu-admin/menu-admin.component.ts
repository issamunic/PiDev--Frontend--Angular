import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  items: MenuItem[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.adminMenu();
  }

  adminMenu() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-chart-line',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              },

            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Domain',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'List of domains',
            icon: 'pi pi-fw pi-list',
            routerLink:"/domain"
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          },

        ]
      },
      {
        label: 'Profession',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          },

        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          /*{
            label: 'New user',
            icon: 'pi pi-fw pi-user-plus',
            //command: () => this.addNewUser(),
            //routerLink:"/home"
          },*/
          {
            label: 'List of users',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Export users',
                items: [
                  {
                    label: 'Excel',
                    icon: 'pi pi-fw pi-file-excel',
                    command: () => this.exportUsersExcel()
                  },
                  {
                    label: 'PDF',
                    icon: 'pi pi-fw pi-file-pdf',
                    command: () => this.exportUsersPDF()
                  }
                ]
              },
              {
                label: 'Companys',
                routerLink:"/userManagementAdmin"
              },
              {
                label: 'Employes',
                routerLink:"/employeManagementAdmin"
              }
            ]
          }
        ]
      }
    ];

  }

  exportUsersExcel(){
    document.location.href = 'http://localhost:8087/SpringMVC/exportUsersExcel';
  }

  exportUsersPDF(){
    document.location.href = 'http://localhost:8087/SpringMVC/exportUsers';
  }
}
