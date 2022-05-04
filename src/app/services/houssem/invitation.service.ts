import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Invitation} from "../../entity/invitation";
import {User} from "../../entity/user";


@Injectable({
  providedIn: 'root'
})
export class InvitationService {
    get headers(): HttpHeaders {
        return this._headers;
    }

    set headers(value: HttpHeaders) {
        this._headers = value;
    }
  readonly API_URL ="http://localhost:8087/SpringMVC/Invitation";
  constructor(private _http:HttpClient) { }



        _headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem('token')
        })


  GetAllInvitationsService():Observable<Invitation[]> {
      return this._http.get<Invitation[]>(`${this.API_URL}/getAll`,{ headers:this.headers });
  }
  AddInvitationService(Invitation: Invitation) {
    return this._http.post(`${this.API_URL}/add`, Invitation,{responseType:'text' as 'json',headers:this.headers});
  }
  DeleteInvitationService(id: any){
    return this._http.delete(`${this.API_URL}/delete/${id}`,{ headers:this.headers });
    }
  getByIdService(id: any){
    return this._http.get(`${this.API_URL}/getById/${id}`,{ headers:this.headers });
  }

    getByCompany(id: any):Observable<Invitation[]> {
        return this._http.get<Invitation[]>(`${this.API_URL}/getByCompany/${id}`,{headers:this.headers}) ;
    }
    csv(user: User) {
        return this._http.post(`http://localhost:8087/SpringMVC/load/csv`, user,{responseType:'text' as 'json',headers:this.headers});
    }
}
