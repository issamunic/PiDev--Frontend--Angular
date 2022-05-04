import { Component, OnInit } from '@angular/core';
import {UploadFileService} from "../services/houssem/upload-file.service";
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
    selectedFiles: FileList;
    currentFile: File;
    progress = 0;
    message = '';
    fileInfos: Observable<any>;
    constructor(private http: HttpClient) { }
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
    })


  ngOnInit(): void {
  }
    upload(event: any) {
        const file = event.target.files[0];

        const formdata = new FormData();
        formdata.append('file', file);

        this.http.post('http://localhost:8087/SpringMVC/upload', formdata,{headers:this.headers}).subscribe(
            (d) => {
                console.log(d);
            },
            (error) => {
                console.error(error);
            }
        );
    }
}
