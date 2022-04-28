import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invitation} from "../../entity/invitation";
import {CodeInvitationCompany} from "../../entity/code-invitation-company";

@Injectable({
  providedIn: 'root'
})
export class CodeInvitationCompanyService {
    // @ts-ignore
    readonly API_URL ="http://localhost:8087/SpringMVC/CodeInvitationCompany";
  constructor(private _http:HttpClient) { }

  GetAllCodeInvitationCompany():Observable<CodeInvitationCompany[]> {
    return this._http.get<CodeInvitationCompany[]>(`${this.API_URL}/getAll`);
  }
  AddCodeInvitationCompany(code:CodeInvitationCompany) {
    return this._http.post(`${this.API_URL}/add`,code,{responseType:'text' as 'json'});
  }
  DeleteCodeInvitationCompany(id:any){
    return this._http.delete(`${this.API_URL}/delete/${id}`);
  }
  getById(id: any):Observable<CodeInvitationCompany>{
    return this._http.get<CodeInvitationCompany>(`${this.API_URL}/getById/${id}`)
  }
  updateCodeInvitationCompany(CodeInvitationCompany: any){
    return this._http.get(`${this.API_URL}/update`,CodeInvitationCompany)
  }
  getByCode(id: any){
    return this._http.get(`${this.API_URL}/getByCompany/${id}`)
  }
}

