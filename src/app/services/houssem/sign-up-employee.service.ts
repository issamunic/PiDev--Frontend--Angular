import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../entity/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpEmployeeService {

    readonly API_URL ="http://localhost:8087/SpringMVC/user";
    constructor(private _http:HttpClient) { }



    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
    })

    SignupEmplyee(User:User,code:string) {
        return this._http.post(`${this.API_URL}/process_register_employee/${code}`, User,{responseType:'text' as 'json',headers:this.headers});
    }
    AllUsers():Observable<User[]>  {
        return this._http.get<User[]>(`http://localhost:8087/SpringMVC/user/retrieve-all-users`,{ headers:this.headers });
}

}
