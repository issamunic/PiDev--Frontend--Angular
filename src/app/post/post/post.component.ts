import { CommentService } from './../../services/comment/comment.service';
import { AuthService } from './../../services/auth/auth.service';
import { PostService } from './../../services/post/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId: number;
  @Input() post: Post;
  commentForm: FormGroup;
  commentPayload: Comment;
  comments: Comment[];

  constructor(private PostService: PostService, private auth: AuthService, private route : ActivatedRoute, 
    private CommentService :CommentService) { 
      this.postId = this.route.snapshot.params.id;
      console.log(this.postId)

      this.commentForm = new FormGroup({
        text: new FormControl('', Validators.required)
      });
      this.commentPayload = {
        text: '',
        postId: this.postId
      };
  }
  

  ngOnInit(): void {
   
    console.log(this.post);
    
    
    
  }
  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.CommentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }
  private getCommentsForPost() {
    this.CommentService.getAllCommentsForPost(56).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }
  private getPostById() {
    this.PostService.getPost(this.postId).subscribe(data => {
      this.post = data;
      console.log(this.post)
      this.getCommentsForPost();  
    }, error => {
      throwError(error);
    });
   
  }
  

}
