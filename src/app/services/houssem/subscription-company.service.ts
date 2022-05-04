import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubscriptionCompany} from "../../entity/subscription-company";
import {CodeInvitationCompany} from "../../entity/code-invitation-company";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionCompanyService {
  readonly API_URL = "http://localhost:8087/SpringMVC/SubscriptionCompany";

  constructor(private _http: HttpClient) { }
    _headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
    })


  GetAllSubscriptionCompany():Observable<SubscriptionCompany[]>  {
    return this._http.get<SubscriptionCompany[]>(`${this.API_URL}/getAll`,{ headers:this._headers});
  }

  AddSubscriptionCompany(SubscriptionCompany: any) {
    return this._http.post(`${this.API_URL}/add`, SubscriptionCompany,{ headers:this._headers});
  }

  DeleteSubscriptionCompany(id: any) {
    return this._http.delete(`${this.API_URL}/delete/${id}`,{ headers:this._headers});
  }

  getById(id: any):Observable<SubscriptionCompany>  {
    return this._http.get<SubscriptionCompany>(`${this.API_URL}/getById/${id}`,{ headers:this._headers})
  }

  updateCodeInvitationCompany(SubscriptionCompany: any) {
    // @ts-ignore
      return this._http.get(`${this.API_URL}/update`, SubscriptionCompany,{ headers:this._headers})
  }

  getByCode(id: any) {
    return this._http.get(`${this.API_URL}/getByCompany/${id}`,{ headers:this._headers})
  }

  UpgradeSubscriptionCompany(SubscriptionCompany: any):Observable<SubscriptionCompany> {
    return this._http.put<SubscriptionCompany>(`${this.API_URL}/UpgradeSubscriptionCompany`, SubscriptionCompany,{responseType:'text' as 'json', headers:this._headers})
  }
  InitilainitializationOfSubscriptionCompany(SubscriptionCompany: any) {
    // @ts-ignore
      return this._http.get(`${this.API_URL}/InitilainitializationOfSubscriptionCompany`, SubscriptionCompany,{ headers:this._headers})
  }
  getByUser(User: any) {
    // @ts-ignore
      return this._http.get(`${this.API_URL}/InitilainitializationOfSubscriptionCompany`, User,{ headers:this._headers })
  }
}
