import { CommentService } from './../../services/comment/comment.service';
import { AuthService } from './../../services/auth/auth.service';
import { PostService } from './../../services/post/post.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Comment } from 'src/app/models/comment';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [ConfirmationService]
}
)
export class PostComponent implements OnInit {
  postId: number;
  @Input() post: Post;
  @Input() numberComments : number =0;
  commentForm: FormGroup;
  commentPayload: Comment = new Comment();
  comments: Comment[];
  images : any[];
  slideIndex:number = 0;
  items : any[];
  text:string;  
  id : number;
  @Output() msgs: Message[] = [];

  @Output()
 someEvent = new EventEmitter();

  constructor(private PostService: PostService, private auth: AuthService, private route : ActivatedRoute, 
    private CommentService :CommentService, private confirmationService: ConfirmationService) { 
  }
  
  plusSlides(){
    if (this.slideIndex==this.post.postFiles.length-1){
      this.slideIndex=0;
    }
    else
    this.slideIndex++;
  }
  MinusSlides(){
    if (this.slideIndex==0){
      this.slideIndex=this.post.postFiles.length-1;
    }
    else
    this.slideIndex--;
  }
  loadComments(idc : number){
    this.getCommentsForPost(idc);
  }
  deletePost(idp : number){
    this.PostService.deletePost(idp).subscribe(res => console.log(res));

  }
  confirm2() {
    this.confirmationService.confirm({
        message: 'Do you want to delete this post?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.deletePost(this.post.idPost);
            this.someEvent.emit(null);
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'post deleted', closable:false}];
            
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected', closable:false}];
        }
    });
}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command : () => {
          this.confirm2();
         //this.deletePost(this.post.idPost);
         //this.someEvent.emit(null);
        }}
    ];
    
    
    
    
    
  }
  postComment(id : number){
    console.log('posting comment');
    if(this.commentPayload.text!=null){
      this.commentPayload.postId = id;
      this.CommentService.postComment(this.commentPayload).subscribe(data =>{
        console.log(data);
        this.getCommentsForPost(id);
        this.comments.unshift(data);
       
        
      })
      this.commentPayload.text='';
    }
  }
  // postComment() {
  //   this.commentPayload.text = this.commentForm.get('text').value;
  //   this.CommentService.postComment(this.commentPayload).subscribe(data => {
  //     this.commentForm.get('text').setValue('');
  //     this.getCommentsForPost(id);
  //   }, error => {
  //     throwError(error);
  //   })
  // }
  private getCommentsForPost(id : number) {
    this.CommentService.getAllCommentsForPost(id).subscribe(data => {
      this.comments = data;
      console.log(this.comments);
    }, error => {
      throwError(error);
    });
  }
  
  private getPostById() {
    this.PostService.getPost(this.postId).subscribe(data => {
      this.post = data;
      console.log(this.post)
      this.getCommentsForPost(this.id);  
    }, error => {
      throwError(error);
    });
   
  }
  

}
