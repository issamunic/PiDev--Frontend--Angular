import { CommunityService } from './../../services/community/community.service';
import { CommentService } from './../../services/comment/comment.service';
import { Component, HostListener, OnInit } from '@angular/core';
import {MenuItem, Message, MessageService} from 'primeng/api';
import { Subscription, throwError } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';
import { PostService } from 'src/app/services/post/post.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Post } from 'src/app/models/post';
import { PostFile } from 'src/app/models/postfile';
import { Community } from 'src/app/models/community/community';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  providers: [MessageService]
})
export class ForumComponent implements OnInit {
  items: MenuItem[];
  msgs: [];
  data: any;
  tab: any;
  postlist : Post[]= [];
  uploadImgageVisible : boolean;
  files: any[] = [];
  newPost : Post = new Post();
  uploadImageData!: FormData;
  loading : boolean = true;
  communities : Community[]= [];
  communitiesofuser : Community[]= [];
  numberComments : number ;
  chartOptions: any;
  subscription: Subscription;
  config: AppConfig;
  authobj : any;
  user : any;
  item : MenuItem;
  display: boolean = false;
  msgsofpost : Message[];
  disabled: boolean = true;
  smallerpostList : Post [];
  loadingspinner : boolean = false;
  noMorePosts : boolean = false;  
  newCommunity : Community = new Community();

    value2: string;

    showDialog() {
        this.display = true;
    }
  constructor( private router : Router, private postService: PostService, private messageService: MessageService
    ,public configService: ConfigService, private CommentService: CommentService,private auth: AuthService , private CommunityService : CommunityService){
    
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
  YourFunction(id :number) {
    this.router.navigate(['/forum/community/'+id]);
 }
  
  createPost() {
    if(this.newPost.description != null){
    this.postService.createPost(this.newPost).subscribe((data) => {
      console.log(data);
      this.newPost = data;
      if(this.files.length > 0) {
        this.newPost.postFiles = [];
       this.uploadFiles(this.newPost);
      }
      this.newPost.description ='';
      this.postlist.unshift(this.newPost);    
    }, error => {
      throwError(error);
    })
  }
  }
  createCommunity(){
    if(this.newCommunity.name!=null && this.newCommunity.description!=null){
      this.CommunityService.createCommunity(this.newCommunity).subscribe((data)=> {
        console.log(data);
        this.newCommunity =data;
        this.display=false;
        this.loadCommunitiesOfUser();
      },error => {
        throwError(error);
      })
    }
    
  }
  updateChartOptions() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
    
}

getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}
  loadCommunities(){
    this.CommunityService.getAllCommunities().subscribe((data: Community[])=>{
      for(let community of data){
        this.communities.push(community);
        this.item = {label: community.name , icon: 'pi pi-fw pi-users', command: (event) => {
          this.YourFunction(community.idCommunity);} } ;
          this.items[0].items.push(this.item);
        
      console.log(this.items[0].items);
      }
    })
  }
  loadCommunitiesOfUser(){
    this.CommunityService.getAllCommunitiesOfusers().subscribe((data: Community[])=>{
      for(let community of data){
        this.communitiesofuser.push(community);
        this.item = {label: community.name , icon: 'pi pi-fw pi-users', command: () => {
          this.YourFunction(community.idCommunity);} } ;
          this.items[1].items.push(this.item);
        
      console.log(this.items[1].items);
      }
    })
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  OnScroll(){
    
    
   
    // @ts-ignore
    if((($(window).scrollTop()+$(window).height()+100) >= $(document).height())&& !this.loadingspinner){
      console.log(this.postlist.length);
      if(this.postlist.length==0){
        this.noMorePosts=true;
        return ;
  
      }
      this.loadingspinner=true;
      setTimeout(()=>{

      let i = 0;
      for(let post of this.postlist){
        i++;
        this.smallerpostList.push(post);
        this.postlist.splice(this.postlist.indexOf(post),1);
        if(this.postlist.length==0){
          this.noMorePosts=true;
          break;
        }
        if(i == 9)
        break;
        
      }
     this.loadingspinner=false;
      },800);
    }

  }

 loadPosts(){
   this.smallerpostList = [];
  this.postlist = [];
  this.postService.getAllPosts().subscribe((data: Post[]) => {
    
    for( let post of data){
      this.CommentService.getCommentsCount(post.idPost).subscribe(num=>
      post.numbercomments= num);
      if(post.community == null)
        
        if(this.smallerpostList.length<10){
          this.smallerpostList.push(post);
        }else this.postlist.push(post);
        
            
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
    
    
  })
 }

  ngOnInit(): void {
    this.newPost ={};
    this.getPourcentagesPie()
    this.auth.auth().subscribe(res =>{
      console.log(res);
      this.authobj = res;
      localStorage.setItem('token', res['jwtToken']);
      this.loadPosts();
     this.loadCommunities();
     this.loadCommunitiesOfUser();
    });

  
 // this.getPourcentagesPie();
 this.uploadImgageVisible = false;
  
  this.config = this.configService.config;
  this.updateChartOptions();
  this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
  });
  console.log(this.data);
  this.items = [
    {
        label: 'Groups I have joined',
        icon: 'pi pi-pw pi-users',
        items: []
    },
    {
      label: 'My Groups',
        icon: 'pi pi-pw pi-users',
        items: []

    }
];
   
  
  }
  getPourcentagesPie(){
    this.CommentService.getCommentsPourcentage().subscribe((res: any[]) =>{
      this.tab = res;
      console.log("aaaaaaaaaaaa"+this.tab);
      this.data = {
        labels: ['Positive','Negative','Neutral'],
        datasets: [
            {
                data: this.tab,
                backgroundColor: [
                    "#273d79",
                    "#a23141",
                    "#523965"
                    
                ],
                hoverBackgroundColor: [
                    "#273d79",
                    "#a23141",
                    "#523965"
                    
                ]
            }
        ]
    };
    });
  }
  
  

}
