import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Invitation} from "../../entity/invitation";
@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  readonly API_URL ="http://localhost:8087/SpringMVC/Invitation";
  constructor(private _http:HttpClient) { }

  GetAllInvitationsService():Observable<Invitation[]> {
    return this._http.get<Invitation[]>(`${this.API_URL}/getAll`);
  }
  AddInvitationService(Invitation: any) {
    return this._http.post(`${this.API_URL}/add`, Invitation);
  }
  DeleteInvitationService(id: any){
    return this._http.delete(`${this.API_URL}/delete/${id}`);
    }
  getByIdService(id: any){
    return this._http.get(`${this.API_URL}/getById/${id}`)
  }
  getByCompany(User: any){
    return this._http.get(`${this.API_URL}/getByCompany`,User)
  }



}
