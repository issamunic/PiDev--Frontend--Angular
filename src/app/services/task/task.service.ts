import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = "http://localhost:8087";
  headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  loadHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    })
  }
  getAllTasks() {
    this.loadHeaders()
    return this.http.get(this.url + "/SpringMVC/task/getAll", { headers: this.headers });

  }

  add(task)
  {
    console.log("appel post task");
    this.loadHeaders()

    return this.http.post(this.url + "/SpringMVC/task/add",
      task,
      { headers: this.headers }
    );
  }

}
