import { ProjectService } from './../services/project/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../Models/project';

import { AuthService } from '../services/auth/auth.service';

import { ConfirmationService, MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PorfilService } from '../services/profile/porfil.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: Project;
  projects: any[];
  selectedProjects: Project[];
  projectDialog: boolean;
  progress: number;
  submitted: boolean;
  create: boolean;
  assign: boolean;

  cities: any[];

  selectedCities: any[];
  items: MenuItem[];
  home: MenuItem;
  constructor(private projectService: ProjectService, private auth: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService
    , private profileService: PorfilService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.login();
    this.loadProjects();
    this.submitted = false;
    this.create = false;
    this.assign = false;
    this.progress = 90;

    this.items = [
      { label: 'Projects' },


    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  openAssign() {
    this.assign = true;

  }


  login() {
    console.log("loging method invoked");

    this.auth.auth().subscribe(res => {
      localStorage.setItem('token', res['jwtToken']);
      console.log("JwtToekn:    " + localStorage.getItem('token'));




    });
  }

  loadProjects() {
    this.projectService.getProductsSmall().subscribe(res => {

      this.projects = <any[]>res;



      this.project = this.projects[0];

      this.cities = this.projects[0].associates;
      console.log("citiesss");
      console.log(this.cities);





    })
  }

  nzidoproject() {


  }

  openNew() {
    this.create = true;

    this.project = {};
    this.submitted = false;
    this.projectDialog = true;

  }

  deleteSelectedProducts() {

    /*
    this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => !this.selectedProducts.includes(val));
              this.selectedProducts = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
      */
  }




  editProduct(project: Project) {
    this.create = false;

    this.project = { ...project };
    console.log("edited");
    console.log(this.project);


    this.projectDialog = true;
  }

  deleteProduct(project: Project) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + project.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projects = this.projects.filter(val => val.projectId !== project.projectId);
        this.projectService.delete(project.projectId).subscribe(res => {
          console.log("delete response");
          console.log(res);

        })
        this.project = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.projectDialog = false;
    this.submitted = false;
  }



  saveProduct() {
    this.submitted = true;
    //console.log(this.project);

    if (this.project.name.trim()) {
      if (this.project.projectId) {
        this.projects[this.findIndexById(this.project.projectId)] = this.project;
        console.log("9bal updaaaaaaaaaaaaaaaaaaate");
        console.log(this.project);


        this.projectService.update(this.project).subscribe(res => {
          console.log("ba3ed el update call");
          console.log(res);


        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {

        // this.project['associates']= [];
        console.log("yoooooooooooooooooooo");
        console.log(this.project);
        this.projectService.postProject(this.project).subscribe(res => {
          console.log("bel service yalla");
          console.log(res);
          this.projects.push(res);


        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }
      //
      this.projects = [...this.projects];
      this.projectDialog = false;
      this.project = {};
      //console.log(this.projects);

    }
  }


  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].projectId === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId()//: string 
  {
    // let id = '';
    // var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // for ( var i = 0; i < 5; i++ ) {
    //     id += chars.charAt(Math.floor(Math.random() * chars.length));
    // }
    // return id;
  }


}
