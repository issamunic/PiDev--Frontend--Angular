import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url="http://localhost:8087";

  constructor(private httpClient: HttpClient, private auth : AuthService) { }
  
  postComment(commentPayload: Comment): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    
    return this.httpClient.post<any>(this.url +'/SpringMVC/comment/add-comment/', commentPayload, { headers:headers });
  }
  getAllCommentsForPost(postId: number): Observable<Comment[]> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    return this.httpClient.get<Comment[]>(this.url +'SpringMVC/comment/retrieve-comment/' + postId,{ headers:headers });
  }
}
