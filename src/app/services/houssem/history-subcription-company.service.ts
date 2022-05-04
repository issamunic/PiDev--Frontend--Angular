import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HistorySubcriptionCompany} from "../../entity/history-subcription-company";

@Injectable({
  providedIn: 'root'
})
export class HistorySubcriptionCompanyService {
  readonly API_URL ="http://localhost:8087/SpringMVC/HistorySubcriptionCompany";
  constructor(private _http:HttpClient) { }
    _headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
    })
  GetAllHistorySubcriptionCompany():Observable<HistorySubcriptionCompany[]> {
    return this._http.get<HistorySubcriptionCompany[]>(`${this.API_URL}/getAll`,{ headers:this._headers});
  }
  AddHistorySubcriptionCompany(HistorySubcriptionCompany: any) {
    return this._http.post(`${this.API_URL}/add`, HistorySubcriptionCompany),{ headers:this._headers};
  }
  DeleteHistorySubcriptionCompany(id: any){
    return this._http.delete(`${this.API_URL}/delete/${id}`,{ headers:this._headers});
  }
  getById(id: any){
    return this._http.get(`${this.API_URL}/getById/${id}`,{ headers:this._headers})
  }
  getByIdCompany(id: any):Observable<HistorySubcriptionCompany[]> {
    return this._http.get<HistorySubcriptionCompany[]>(`${this.API_URL}/getByIdCompany/${id}`,{ headers:this._headers})
  }
}


