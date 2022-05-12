import { Component, Input, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CarouselModule} from 'primeng/carousel';
import { StoriesService } from '../services/stories/stories.service';
import { AuthService } from './../services/auth/auth.service';
import { ChatService } from '../services/chat/chat.service';
import { chat } from '../../chat';

@Component({
  selector: 'app-list-stories',
  templateUrl: './list-stories.component.html',
  styleUrls: ['./list-stories.component.scss']
  
})

export class ListStoriesComponent implements OnInit {
@Input() indicators = true;
  constructor( private ss : StoriesService ,private auth : AuthService ,private activatedRoute: ActivatedRoute) { }

  detailStorie : any;
  chat = new chat();
  @Input() conversation;

  selectedIndex=0;

  submitMessage(event){
    

    let value = event;
    this.chat.message=value;
    this.ss.repeatToStorie(this.chat,1).subscribe();
    var time = new Date();
    
    console.log("cjaaaaaaaaaaaaaaaaat=>"+this.chat);
    var times = (time.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }));
    if(value!=' '){
      console.info("manajmouch notou espace");
      event.target.value = '';
      this.conversation[3] = "Vous : "+value;
      this.conversation[6] = times
      this.conversation.push({
      message : value,
      time:times,
    })
  }
}

  selectImage(index :number): void{
    this.selectedIndex = index ;
  }
   images = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'person2',
    },
  ]
  
  ngOnInit(): void {
    this.auth.auth().subscribe(res =>{
      localStorage.setItem('token', res['jwtToken']);

    //  console.log("id Conversation chatbox "+this.conversation[0]);
   });

   let id = this.activatedRoute.snapshot.params.id;
   console.log("++++++++++++ "+id);

   this.ss.getGtoriesByUser(id).subscribe(
     resdetails=>{console.log(resdetails); this.detailStorie=resdetails});
  }


}
