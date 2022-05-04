import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListEmployeePerCompanyService {
  readonly API_URL ="http://localhost:8087/SpringMVC/ListEmployeePerCompany";
  constructor(private _http:HttpClient) { }
    _headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
    })

  GetAllListEmployeePerCompany() {
    return this._http.get(`${this.API_URL}/getAll`,{ headers:this._headers});
  }
  AddListEmployeePerCompany(ListEmployeePerCompany: any) {
    return this._http.post(`${this.API_URL}/add`, ListEmployeePerCompany,{ headers:this._headers});
  }
  UpdateListEmployeePerCompany(ListEmployeePerCompany: any) {
    return this._http.post(`${this.API_URL}/update`, ListEmployeePerCompany,{ headers:this._headers});
  }
  DeleteListEmployeePerCompany(id: any){
    return this._http.delete(`${this.API_URL}/delete/${id}`,{ headers:this._headers});
  }
  getById(id: any){
    return this._http.get(`${this.API_URL}/getById/${id}`,{ headers:this._headers})
  }
  getCompany(id: any){
    return this._http.get(`${this.API_URL}/getCompany/${id}`,{ headers:this._headers})
  }
  getEmployees(id: any){
    return this._http.get(`${this.API_URL}/getEmployees/${id}`,{ headers:this._headers})
  }
}

