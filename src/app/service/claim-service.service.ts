import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Claim } from '../api/claim';
import { Activity } from '../api/Activity';

@Injectable({
  providedIn: 'root'
})
export class ClaimServiceService {
  [x: string]: any;

  private endpoint: string;

  errorMessage: any;

  reportId: any;

  constructor(private http: HttpClient) {

    this.endpoint = 'http://localhost:8087/SpringMVC/Report/';
   }


   public fetchClaimByLastYear(): Observable<any> {
    return this.http.get(this.endpoint+"an");
  }

  public fetchClaimByLastMounth(): Observable<any> {
    return this.http.get(this.endpoint+"mois");
  }

  public fetchClaimByLastWeek(): Observable<any> {
    return this.http.get(this.endpoint+"semaine");
  }

  public fetchClaimTypeByLastWeek(): Observable<any> {
    return this.http.get(this.endpoint+"chartReportType/semaine");
  }
  
  public fetchClaimTypeByLastmounth(): Observable<any> {
    return this.http.get(this.endpoint+"chartReportType/mois");
  }
  public fetchClaimTypeByLastyear(): Observable<any> {
    return this.http.get(this.endpoint+"chartReportType/an");
  }

  public listAllClaims(): Observable<any> {
    return this.http.get(this.endpoint+"get-Reclamation");
  }

  public listAllClaimsbyId(): Observable<any> {
    return this.http.get(this.endpoint+"ReclamationByUserId/2");
  }

  public postclaim(claim: Claim) {
    this.http.post<any>(this.endpoint+"add-Report", claim).subscribe(response =>{
      console.log(response);

    });
    
  


  }

  public addActivities(activities: Array<Activity>,tripPlan:number){
    this.http.post<any>("http://localhost:8087/SpringMVC/Activity/addbyResp/"+tripPlan, activities).subscribe(response =>{
      console.log(response);

    }); 

  }
  

  addclaim2(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(this.endpoint+"add-Report", claim)
      .pipe(
        catchError(this.handleError('addHero', claim))
      );
  }

  public ActivitiesOfTripPlan(tripPlan:number): Observable<any> {
    return this.http.get("http://localhost:8087/SpringMVC/Activity/find-Activities-ByTripPlan/"+tripPlan);
  }

  public planificateActivities(tripPlan:number){
     this.http.get("http://localhost:8087/SpringMVC/Activity/update/"+tripPlan).subscribe(response =>{
      console.log(response);

    }); 

  }

  public programme(): Observable<any> {
    return this.http.get("http://localhost:8087/SpringMVC/Activity/find-Activities-ByTripPlan/2");
    

 }
  
  
}


