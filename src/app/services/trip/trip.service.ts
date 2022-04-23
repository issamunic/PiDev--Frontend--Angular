import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  url="http://localhost:8087";

  constructor(private http : HttpClient) { }

  getTrips(){
    console.log("appel trip");
    
   
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      })
      console.log(headers.get("authorization"));
      
    return this.http.get(this.url+"/SpringMVC/trip/getAll", { headers:headers });
  }



}
