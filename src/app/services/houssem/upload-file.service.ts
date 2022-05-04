import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
    private req ;
    private baseUrl = 'http://localhost:8087/SpringMVC';
    constructor(private http: HttpClient) { }
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
    })


    upload(file: File):Observable<HttpEvent<any>> {
        // @ts-ignore
        const formData: FormData = new FormData();
        formData.append('file', file);

        // @ts-ignore
        return this.http.post(`http://localhost:8087/SpringMVC/upload`, formData,{headers:this.headers});
    }

}
