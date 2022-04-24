import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url="http://127.0.0.1:8087";
  constructor(private http : HttpClient) { }

  getAllPosts(){

        const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      })
      
    return this.http.get(this.url+"/SpringMVC/post/retrieve-posts", { headers:headers });
  }
  getPost(id: number): Observable<Post> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    console.log('salaam');
    return this.http.get<Post>(this.url+"/SpringMVC/post/retrieve-post/" + id, { headers:headers });
  }
}
