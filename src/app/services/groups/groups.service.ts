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
      });

    return this.http.get<any>(this.url+"chat/getGoupMessageByUser", { headers:headers });
    }


    public getMessageByGroup(id:number):Observable<any>{
      console.log("appel getMessageByGroup/-------"+id);    
     
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      });
      return this.http.get<chat>(this.url+"chat/getMessageByGroup/"+id , { headers:headers });
      }

     
      deleteUserById(idGroup,idUser:number){
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem('token')
        })

            return this.http.delete(this.url+"group/removeUser/"+idGroup+"/"+idUser, { headers:headers });
          }

        


      public getDetailGroup(idGroup : number ):Observable<any>{
    
          const headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem('token')
          })
          console.log("getDetailGroup ===> ");

        return this.http.get<any>(this.url+"group/getDetailGroup/"+idGroup, { headers:headers });

        }


      public RenameGroup(idGroup : number , newName : string):Observable<any>{
        console.log("appel groups");    
       
          const headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem('token')
          })
          
          console.log("new name"+newName);
        return this.http.put(this.url+"group/renameGroups/"+idGroup+"/"+newName, { headers:headers });
        }




          public addUserToGroup(idGroup,idUser:number){
            const headers = new HttpHeaders({ 
              'Content-Type': 'application/json',
              'Authorization': "Bearer "+localStorage.getItem('token')
            })
        
            return this.http.put(this.url+"group/AddMemberToGroups/"+idGroup+"/"+idUser,{ headers:headers });

            }

      

}
