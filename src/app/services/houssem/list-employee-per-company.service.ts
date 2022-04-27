import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListEmployeePerCompanyService {
  readonly API_URL ="http://localhost:8087/SpringMVC/ListEmployeePerCompany";
  constructor(private _http:HttpClient) { }

  GetAllListEmployeePerCompany() {
    return this._http.get(`${this.API_URL}/getAll`);
  }
  AddListEmployeePerCompany(ListEmployeePerCompany: any) {
    return this._http.post(`${this.API_URL}/add`, ListEmployeePerCompany);
  }
  UpdateListEmployeePerCompany(ListEmployeePerCompany: any) {
    return this._http.post(`${this.API_URL}/update`, ListEmployeePerCompany);
  }
  DeleteListEmployeePerCompany(id: any){
    return this._http.delete(`${this.API_URL}/delete/${id}`);
  }
  getById(id: any){
    return this._http.get(`${this.API_URL}/getById/${id}`)
  }
  getCompany(id: any){
    return this._http.get(`${this.API_URL}/getCompany/${id}`)
  }
  getEmployees(id: any){
    return this._http.get(`${this.API_URL}/getEmployees/${id}`)
  }
}

