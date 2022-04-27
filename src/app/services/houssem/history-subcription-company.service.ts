import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HistorySubcriptionCompanyService {
  readonly API_URL ="http://localhost:8087/SpringMVC/HistorySubcriptionCompany";
  constructor(private _http:HttpClient) { }

  GetAllHistorySubcriptionCompany() {
    return this._http.get(`${this.API_URL}/getAll`);
  }
  AddHistorySubcriptionCompany(HistorySubcriptionCompany: any) {
    return this._http.post(`${this.API_URL}/add`, HistorySubcriptionCompany);
  }
  DeleteHistorySubcriptionCompany(id: any){
    return this._http.delete(`${this.API_URL}/delete/${id}`);
  }
  getById(id: any){
    return this._http.get(`${this.API_URL}/getById/${id}`)
  }
  getByIdCompany(id: any){
    return this._http.get(`${this.API_URL}/getByCompany/${id}`)
  }
}


