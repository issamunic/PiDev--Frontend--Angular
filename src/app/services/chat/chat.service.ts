import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chat } from '../../../chat';
import { react } from '../../../react';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url="http://localhost:8087/SpringMVC/";
  constructor(private http : HttpClient) { }


  public AddReact(react:react){
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    });   
    
        return this.http.post<react>(this.url+"chat/react",react, { headers:headers });
      }



  public getLinks(id : number):Observable<string>{
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      });      
      
    return this.http.get<string>(this.url+"chat/GetLink/"+id , { headers:headers });
    }
    public sendVoice(idGroup : number){
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      });   
      
          return this.http.post<any>(this.url+"chat/voice/"+idGroup, { headers:headers });
        }

    
    public sendMessage(chat:chat,idGroup : number){
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      });   
      
          return this.http.post<chat>(this.url+"chat/"+idGroup ,chat, { headers:headers });
        }
      
    public getFileFromGroup(id : number):Observable<string>{
     
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        });
        


      return this.http.get<string>(this.url+"chat/getFileFromGroup/"+id, { headers:headers });
      }

      

      public getMessageByGroup(id : number):Observable<any>{

        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        });
  
        return this.http.get<any>(this.url+"chat/getMessageByGroup/10", { headers:headers });
        }



        
      
}
