import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  url="http://localhost:8087";

  constructor(private http : HttpClient) { }
  headers : HttpHeaders;

  getTrips(){
    console.log("appel trip");
    
   
     this.loadHeaders();
      //console.log(this.headers.get("authorization"));
      
    return this.http.get(this.url+"/SpringMVC/trip/getAll", { headers:this.headers });
  }


  loadHeaders()
  {
    this.headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
  }

  postTrip(trip) {
    console.log("appel post trip");
    this.loadHeaders()

    return this.http.post(this.url + "/SpringMVC/trip/add",
      trip,
      { headers: this.headers }
    );
  }


  update(trip) {
    console.log("appel update trip");
    this.loadHeaders()
    //project.associates = null;
    return this.http.put(this.url + "/SpringMVC/trip/update",
    trip,
      { headers: this.headers }
    );
  }
  delete(id) {
    console.log("appel delete trip");
    this.loadHeaders()

    return this.http.delete(this.url + "/SpringMVC/trip/delete/"+id,
     
      { headers: this.headers }
    );
    
  }
}
