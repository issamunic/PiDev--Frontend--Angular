import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chat } from '../../../chat';




@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  url="http://localhost:8087/SpringMVC/";

  constructor(private http : HttpClient) { }
  
  public getGroups():Observable<any>{
    console.log("appel groups");    
   
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      })
      console.log(headers.get("authorization"));
      
    return this.http.get<any>(this.url+"chat/getGoupMessageByUser", { headers:headers });
    }


    public getMessageByGroup(id:number):Observable<any>{
      console.log("appel getMessageByGroup/");    
     
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      })
      console.log(headers.get("authorization"));
      
        
        
      return this.http.put(this.url+"chat/getMessageByGroup/10", { headers:headers });
      }

      public RenameGroup(idGroup : number , newName : string):Observable<any>{
        console.log("appel groups");    
       
          const headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem('token')
          })
          console.log(headers.get("authorization"));
          
          console.log("new name"+newName);
        return this.http.put(this.url+"group/renameGroups/"+idGroup+"/"+newName, { headers:headers });
        }
}
