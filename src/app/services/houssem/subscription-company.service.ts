import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionCompanyService {
  readonly API_URL = "http://localhost:8087/SpringMVC/SubscriptionCompany";

  constructor(private _http: HttpClient) {
  }

  GetAllSubscriptionCompany() {
    return this._http.get(`${this.API_URL}/getAll`);
  }

  AddSubscriptionCompany(SubscriptionCompany: any) {
    return this._http.post(`${this.API_URL}/add`, SubscriptionCompany);
  }

  DeleteSubscriptionCompany(id: any) {
    return this._http.delete(`${this.API_URL}/delete/${id}`);
  }

  getById(id: any) {
    return this._http.get(`${this.API_URL}/getById/${id}`)
  }

  updateCodeInvitationCompany(SubscriptionCompany: any) {
    return this._http.get(`${this.API_URL}/update`, SubscriptionCompany)
  }

  getByCode(id: any) {
    return this._http.get(`${this.API_URL}/getByCompany/${id}`)
  }

  UpgradeSubscriptionCompany(SubscriptionCompany: any) {
    return this._http.get(`${this.API_URL}/UpgradeSubscriptionCompany`, SubscriptionCompany)
  }
  InitilainitializationOfSubscriptionCompany(SubscriptionCompany: any) {
    return this._http.get(`${this.API_URL}/InitilainitializationOfSubscriptionCompany`, SubscriptionCompany)
  }
  getByUser(User: any) {
    return this._http.get(`${this.API_URL}/InitilainitializationOfSubscriptionCompany`, User)
  }
}
