import { TripService } from './../services/trip/trip.service';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ProjectService } from '../services/project/project.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PorfilService } from '../services/profile/porfil.service';
import { Project } from '../Models/project';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
  
})
export class TripComponent implements OnInit {


  trip: any;
  trips: any;
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

  countries: any[];

selectedCity1: any;
  
  constructor(private tripService: TripService, private projectService: ProjectService, private auth: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService
    , private profileService: PorfilService, private sanitizer: DomSanitizer) { }






  ngOnInit(): void {
 
    
    this.login();
    this.loadTrips();
    this.submitted = false;
    this.create = false;
    this.assign = false;
    this.progress = 90;

    this.items = [
      { label: 'Trips' },


    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };


    this.countries = [
      {
          name: 'Australia',
          code: 'AU',
          states: [
              {
                  name: 'New South Wales',
                  cities: [
                      {cname: 'Sydney', code: 'A-SY'},
                      {cname: 'Newcastle', code: 'A-NE'},
                      {cname: 'Wollongong', code: 'A-WO'}
                  ]
              },
              {
                  name: 'Queensland',
                  cities: [
                      {cname: 'Brisbane', code: 'A-BR'},
                      {cname: 'Townsville', code: 'A-TO'}
                  ]
              },
              
          ]
      },
      {
          name: 'Canada', 
          code: 'CA',
          states: [
              {
                  name: 'Quebec',
                  cities: [
                      {cname: 'Montreal', code: 'C-MO'},
                      {cname: 'Quebec City', code: 'C-QU'}
                  ]
              },
              {
                  name: 'Ontario',
                  cities: [
                      {cname: 'Ottawa', code: 'C-OT'},
                      {cname: 'Toronto', code: 'C-TO'}
                  ]
              },
              
          ]
      },
      {
          name: 'United States',
          code: 'US',
          states: [
              {
                  name: 'California',
                  cities: [
                      {cname: 'Los Angeles', code: 'US-LA'},
                      {cname: 'San Diego', code: 'US-SD'},
                      {cname: 'San Francisco', code: 'US-SF'}
                  ]
              },
              {
                  name: 'Florida',
                  cities: [
                      {cname: 'Jacksonville', code: 'US-JA'},
                      {cname: 'Miami', code: 'US-MI'},
                      {cname: 'Tampa', code: 'US-TA'},
                      {cname: 'Orlando', code: 'US-OR'}
                  ]
              },
              {
                  name: 'Texas',
                  cities: [
                      {cname: 'Austin', code: 'US-AU'},
                      {cname: 'Dallas', code: 'US-DA'},
                      {cname: 'Houston', code: 'US-HO'}
                  ]
              }
          ]
      }
  ];

  };

  

  login() {
    console.log("loging method invoked");

    this.auth.auth().subscribe(res => {
      localStorage.setItem('token', res['jwtToken']);
      console.log("JwtToekn:    "+localStorage.getItem('token'));




    });
  }

  loadTrips() {
    this.tripService.getTrips().subscribe(res => {
      console.log(res);
      this.trips=res;
    })
  }
  nzidoproject() {


  }

  openNew() {
    this.create = true;

    this.trip = {};
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




  editProduct(trip: any) {
    this.create = false;

    this.trip = { ...trip };
    console.log("edited");
    console.log(this.trip);


    this.projectDialog = true;
  }

  deleteProduct(trip: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + trip.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trips = this.trips.filter(val => val.tripId !== trip.tripId);
        this.tripService.delete(trip.tripId).subscribe(res => {
          console.log("delete response");
          console.log(res);

        })
        this.trip = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'trip Deleted', life: 3000 });
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

    if (this.trip.name.trim()) {
      if (this.trip.tripId) {
        this.trip[this.findIndexById(this.trip.projectId)] = this.trip;
        console.log("9bal updaaaaaaaaaaaaaaaaaaate");
        console.log(this.trip);


        this.tripService.update(this.trip).subscribe(res => {
          console.log("ba3ed el update call");
          console.log(res);


        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'trip Updated', life: 3000 });
      }
      else {

        // this.project['associates']= [];
        console.log("yoooooooooooooooooooo");
        console.log(this.trip);
        this.tripService.postTrip(this.trip).subscribe(res => {
          console.log("bel service yalla");
          console.log(res);
          this.trips.push(res);


        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'trip Created', life: 3000 });
      }
      //
      this.trips = [...this.trips];
      this.projectDialog = false;
      this.trip = {};
      //console.log(this.projects);

    }
  }


  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.trips.length; i++) {
      if (this.trips[i].projectId === id) {
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
