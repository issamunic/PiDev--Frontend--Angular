import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from 'src/app/Models/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = "http://localhost:8087";
  headers: HttpHeaders;

  constructor(private http: HttpClient) { }


  getProductsSmall() {
    this.loadHeaders()
    return this.http.get(this.url + "/SpringMVC/project/getAll", { headers: this.headers });

  }

  loadHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    })
  }

  postProject(project) {
    console.log("appel post project");
    this.loadHeaders()

    return this.http.post(this.url + "/SpringMVC/project/add",
      project,
      { headers: this.headers }
    );
  }
  update(project) {
    console.log("appel update project");
    this.loadHeaders()
    //project.associates = null;
    return this.http.put(this.url + "/SpringMVC/project/update",
      project,
      { headers: this.headers }
    );
  }
  delete(id) {
    console.log("appel delete project");
    this.loadHeaders()

    return this.http.delete(this.url + "/SpringMVC/project/delete/"+id,
     
      { headers: this.headers }
    );
    
  }


}
