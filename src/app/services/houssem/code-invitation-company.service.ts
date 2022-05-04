import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

    _headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
    })

  GetAllCodeInvitationCompany():Observable<CodeInvitationCompany[]> {
    return this._http.get<CodeInvitationCompany[]>(`${this.API_URL}/getAll`,{ headers:this._headers});
  }
  AddCodeInvitationCompany(code:CodeInvitationCompany) {
    return this._http.post(`${this.API_URL}/addFinal`,code,{responseType:'text' as 'json', headers:this._headers});
  }
  DeleteCodeInvitationCompany(id:any){
    return this._http.delete(`${this.API_URL}/delete/${id}`,{ headers:this._headers});
  }
  getById(id: any):Observable<CodeInvitationCompany>{
    return this._http.get<CodeInvitationCompany>(`${this.API_URL}/getById/${id}`,{ headers:this._headers})
  }
  updateCodeInvitationCompany(code: CodeInvitationCompany){
      // @ts-ignore
      return this._http.put(`${this.API_URL}/update`,code,{responseType:'text' as 'json', headers:this._headers});

  }
  getByCode(id: any){
    return this._http.get(`${this.API_URL}/getByCompany/${id}`,{ headers:this._headers})
  }
}

