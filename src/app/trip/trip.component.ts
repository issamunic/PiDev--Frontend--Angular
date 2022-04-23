import { TripService } from './../services/trip/trip.service';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  constructor( private tripService : TripService,private auth : AuthService) { }

  ngOnInit(): void {
    this.auth.auth().subscribe(res =>{
         console.log(res);
         localStorage.setItem('token', res['jwtToken']);
         console.log(localStorage.getItem('token'));

         console.log("--------------------------------");

        
         
    });
  }

  loadTrips(){
    this.tripService.getTrips().subscribe( res => {
      console.log(res);
    })
  }

}
