import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stories } from "../../../stories";
import { chat } from "../../../chat";




@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  url="http://localhost:8087/SpringMVC/";
  
  constructor(private http : HttpClient) { }

  public getGtoriesByUser(id:number):Observable<any>{
    console.log("appel stories");    
   
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      });

    return this.http.get<stories>(this.url+"Stories/getStorieByUser/"+id, { headers:headers });
    }

    public getFollowersStorie():Observable<any>{
      console.log("appel stories");    
     
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        });
  
      return this.http.get<stories>(this.url+"Stories/getFollowersStorie", { headers:headers });
      }

    public repeatToStorie(chats : chat ,id:number):Observable<any>{
      console.log("appel stories");    
     
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        });
  
      return this.http.post<chat>(this.url+"Stories/repeat/"+id,chats, { headers:headers });
      }


      deleteStorie(idStorie:number){
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        })

            return this.http.delete(this.url+"deleteSoty/"+idStorie, { headers:headers });
          }
  
}
