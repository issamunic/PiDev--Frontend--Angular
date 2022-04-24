import { TripService } from './../services/trip/trip.service';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  constructor(private tripService: TripService, private auth: AuthService) { }

  ngOnInit(): void {

  }

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
    })
  }

}
