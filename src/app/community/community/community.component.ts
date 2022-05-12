import { Community } from 'src/app/models/community/community';
import { CommunityService } from './../../services/community/community.service';
import { CommentService } from './../../services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostFile } from 'src/app/models/postfile';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  communityId: number;
  uploadImgageVisible : boolean;
  postlist : Post[]= [];
  files: any[] = [];
  newPost : Post = new Post();
  uploadImageData!: FormData;
  loading : boolean = true;
  numberComments : number ;
  community : Community = new Community();
  display: boolean = false;
  selectedCountries1: User[];
  users : User[]=[];
  members : User[] = [];


  constructor(private auth: AuthService, private activateRoute: ActivatedRoute , private postService: PostService , private CommentService: CommentService , private communityService : CommunityService) {
    this.communityId= this.activateRoute.snapshot.params.id;
    
    this.users = [
      {login: 'New York', image: 'NY'},
      {login: 'Rome', image: 'RM'},
      {login: 'London', image: 'LDN'},
      {login: 'Istanbul', image: 'IST'}
     ];
     
   }
   showhideUtility(){
    this.uploadImgageVisible = this.uploadImgageVisible?false:true;
    
  }
  onSelectEvent($event){
    console.log($event);
}
uploadFile($event){
    for (let file of $event.files){
    this.files.push(file);}
    console.log(this.files);

}
removeFile($event){
    this.files.splice(this.files.indexOf($event.File),1);
    console.log(this.files);
}
uploadFiles(p: Post) {
    console.log(p);
  for(const file of this.files) {
      console.log(file);
    this.uploadImageData = new FormData();
    this.uploadImageData.append('file', file, file.name);
    console.log(this.uploadImageData);
    this.postService.uploadImage(this.uploadImageData, p.idPost)
      .subscribe((response) => {
        console.log(response);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          let pf = new PostFile();
          pf.url = response;
          pf.image = reader.result;
          p.postFiles.push(pf);
          reader.abort();
        }
      }, error => console.log(error));
  };
}
createPost() {
  if(this.newPost.description != null){
  this.postService.createPostCommunity(this.newPost, this.communityId).subscribe((data) => {
    console.log(data);
    this.newPost = data;
    if(this.files.length > 0) {
      this.newPost.postFiles = [];
     this.uploadFiles(this.newPost);
    }
    this.postlist.unshift(this.newPost);
    
  }, error => {
    throwError(error);

  })
  this.newPost.description='';
    this.newPost.postFiles=[];
  
  
}}
loadPosts(){
  this.postlist = [];
  this.postService.getAllPosts().subscribe((data: Post[]) => {
    
    for( let post of data){
      this.CommentService.getCommentsCount(post.idPost).subscribe(num=>
      post.numbercomments= num);
      if (post.community!=null && post.community.idCommunity == this.communityId)
        this.postlist.push(post);
        
            
            for(let postFile of post.postFiles) {
                
                this.loading = true;
                          this.postService.loadImage(postFile).subscribe(
                            img => {
                              let pf = new PostFile();
                              // @ts-ignore
                              pf.url = postFile;
                              pf.image = img;
                              post.postFiles[post.postFiles.indexOf(postFile)] = pf;
                            }, error => {
                              console.log(error);
                            }
                          )
                        }
            
    }
    this.loading = false;
    
    
  })}
  getMembers(){
    this.communityService.getFollowings().subscribe((data : User[] )=> {
      this.users = data;
      console.log(this.users);
    })
  }
  loadUsers(id: number){
    this.communityService.getCommunityUsers(id).subscribe(data =>{
      this.members =data;
      console.log(this.members);
    })
    
  }
  getOneCom (){
    this.communityService.getOneCommunity(this.communityId).subscribe((data:Community) => {
      console.log(data);
      this.community = data;
    })
  }
  showDialog() {
    this.display = true;
}
  addUserstoCom(){
    for ( let user of this.selectedCountries1){
      this.addUserToCommunity(user.idUser);
    }
    this.display = false;
  }
  addUserToCommunity(iduser : number){
    this.communityService.addUsertoCom(this.communityId,iduser).subscribe((res)=>{
      console.log(res);
    });
    this.loadUsers(this.communityId);

  }

  ngOnInit(): void {
    console.log(this.users);
    this.newPost.description='';
    this.getMembers();
    
    this.auth.auth().subscribe(res =>{
      console.log(res);
      localStorage.setItem('token', res['jwtToken']);
      this.loadPosts();
      this.getOneCom();
      this.loadUsers(this.communityId);
     
    });
  }

}
