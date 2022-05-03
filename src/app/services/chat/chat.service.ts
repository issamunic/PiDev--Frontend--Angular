import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chat } from '../../../chat';




@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url="http://localhost:8087/SpringMVC/";
  constructor(private http : HttpClient) { }

  public getLinks(id : number):Observable<string>{
    console.log("get links");    
   
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      })
      console.log(headers.get("authorization"));
      
    return this.http.get<string>(this.url+"chat/GetLink/"+id , { headers:headers });
    }
    
    public getFileFromGroup(id : number):Observable<string>{
      console.log("get file");    
     
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        })
        console.log(headers.get("authorization"));


      return this.http.get<string>(this.url+"chat/getFileFromGroup/"+id, { headers:headers });
      }


      public getMessageByGroup(id : number):Observable<any>{
        console.log("get getMessageByGroup");  
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        })
        console.log(headers.get("authorization"));
  
        return this.http.put<any>(this.url+"chat/getMessageByGroup/10", { headers:headers });
        }

      
}
