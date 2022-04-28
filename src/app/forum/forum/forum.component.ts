import { CommentService } from './../../services/comment/comment.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import { Editor } from 'primeng/editor';
import { Subscription, throwError } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { CreatePostPayload } from 'src/app/models/create-post.payload';
import { ConfigService } from 'src/app/service/app.config.service';
import { PostService } from 'src/app/services/post/post.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Post } from 'src/app/models/post';



@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  providers: [MessageService]
})
export class ForumComponent implements OnInit {
  items: MenuItem[];
  text2 : string;
  postPayload: CreatePostPayload;
  msgs: [];
  data: any;
  tab: any;
  tab1: Array<number> = [];
  postlist : Post[];

    chartOptions: any;

    subscription: Subscription;

    config: AppConfig;

  constructor(private router: Router, private postService: PostService, private messageService: MessageService
    ,public configService: ConfigService, private CommentService: CommentService,private auth: AuthService ){
    this.postPayload = {
      url: '',
      description: '',
      CommunityName: '',
      city : [''],
      country : [''],
      stateOrProvince : ['']
   }
  }
  
  showText(){
    console.log(this.text2);
  }
  createPost() {
    if(this.text2 != null){
    this.postPayload.url = 'url';
    this.postPayload.description = this.text2;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      console.log(data);
      this.postlist.unshift(data);
    }, error => {
      throwError(error);
    })
    this.text2 = '';
  }
  else {
    this.messageService.add({severity:'error', summary:"you haven't type anything!"})
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


 loadPosts(){
  this.postlist = [];
  this.postService.getAllPosts().subscribe((data: Post[]) => {
    this.postlist = data;
    console.log(data);
  })
 }

  ngOnInit(): void {
    this.getPourcentagesPie()
    this.auth.auth().subscribe(res =>{
      console.log(res);
      localStorage.setItem('token', res['jwtToken']);
      this.loadPosts();
    });

  
 // this.getPourcentagesPie();
  
  this.config = this.configService.config;
  this.updateChartOptions();
  this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
  });
  console.log(this.data);
    this.text2 = "",
    this.items = [
      {
          label: 'Groups',
          icon: 'pi pi-pw pi-file',
          items: [
              {label: 'group1', icon: 'pi pi-fw pi-external-link'},
              {separator: true},
              {label: 'group2', icon: 'pi pi-fw pi-times'}
          ]
      },
      {
          label: 'Country',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      },
      {
          label: 'City',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Contents',
                  icon: 'pi pi-pi pi-bars'
              },
              {
                  label: 'Search', 
                  icon: 'pi pi-pi pi-search', 
                  items: [
                      {
                          label: 'Text', 
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'User',
                          icon: 'pi pi-fw pi-file',
                      }
              ]}
          ]
      },
      {
          label: 'State or province',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
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
                    "#42A5F5",
                    "#FFA726",
                    "#66BB6A"
                    
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#FFB74D",
                    "#81C784"
                    
                ]
            }
        ]
    };
    });
  }
  
  

}
