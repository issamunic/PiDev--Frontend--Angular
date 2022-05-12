import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './../services/auth/auth.service';
import { ChatService } from '../services/chat/chat.service';
import { GroupsService } from '../services/groups/groups.service';
import { ActivatedRoute } from '@angular/router';
import {SpeedDialModule} from 'primeng/speeddial';
import { chat } from '../../chat';
import { react } from '../../react';






@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

@Input() conversation;
@Input() groupNameUpdaet;
id:any;
detailsChat : any;
reactChat;
chatMessages:any;
sessionId=2;
chat = new chat();
react = new react();
hoverEvent:boolean;

selectedFile :File;
retrieveFile : any;
base64Data : any;
imageName:any;
numberheart=0;
numberheartNew=this.numberheart;
emoji=0;
numberLike=0;
numberLikeNew=this.numberLike;
numberdislike=0;
numberdislikeNew=this.numberdislike;
idMessageClicked=0;
constructor( private chatServices:ChatService ,  private gs : GroupsService ,private auth : AuthService) {}

  items: MenuItem[];
  title = 'appBootstrap';

  addLike(value:number){
    if(this.emoji!=1){
      this.react.idMessage=value;
      this.react.react="like";
      this.chatServices.AddReact(this.react).subscribe();

      this.emoji=1;
      this.numberLikeNew+=1;
    }
    else{
      this.emoji=0;
      this.numberLikeNew-=1;
    }
    this.idMessageClicked=value;
    console.log(value+"hahaha like");
    
  }
  addDisLike(value:number){
    if(this.emoji!=2){
      this.emoji=2;
      this.numberdislikeNew+=1;
    }
    else{
      this.emoji=0;
      this.numberdislikeNew-=1;
    }
    this.idMessageClicked=value;
    console.log(value+"hahaha addDisLike");
  }
  addHeart(value:number){
    if(this.emoji!=3){
      this.emoji=3;
      this.numberheartNew+=1;
    }
    else{
      this.emoji=0;
      this.numberheartNew-=1;
    }
    this.idMessageClicked=value;
    console.log(value+"hahaha addHeart");
  }
  submitMessage(event){
    let value = event.target.value;
    var time = new Date();
    this.chat.message=value;
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

submitVocalBtn(){

  let value = this.chat.message;
  this.chatServices.sendVoice(this.conversation[0]).subscribe();
  
  var time = new Date();
  this.chat.message=value;
  console.log("cjaaaaaaaaaaaaaaaaat=>"+this.chat);
  var times = (time.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }));
  if(value!=' '){
    console.info("manajmouch notou espace");
    this.conversation[3] = "Vous : "+value;
    this.conversation[6] = times
    this.conversation.push({
    message : value,
    time:times,
  })
  this.chatMessages.unshift({
    message : value,
    time:times,
    me : true,
  })
}
}
submitMessageBtn(){

  let value = this.chat.message;
  this.chatServices.sendMessage(this.chat,this.conversation[0]).subscribe();
  
  var time = new Date();
  this.chat.message=value;
  console.log("cjaaaaaaaaaaaaaaaaat=>"+this.chat);
  var times = (time.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }));
  if(value!=' '){
    console.info("manajmouch notou espace");
    this.conversation[3] = "Vous : "+value;
    this.conversation[6] = times
    this.conversation.push({
    message : value,
    time:times,
  })
  this.chatMessages.unshift({
    message : value,
    time:times,
    me : true,
  })
}
}

onFileChanged(event){
  this.selectedFile = event.target.files[0];
}
  ngOnInit(): void {

    this.auth.auth().subscribe(res =>{
         localStorage.setItem('token', res['jwtToken']);

         console.log("id Conversation chatbox "+this.conversation[0]);
      });

      this.gs.getDetailGroup(this.conversation[0]).subscribe(
        resdetailsChat=>{console.log(resdetailsChat); this.detailsChat=resdetailsChat});
    
        
      this.gs.getMessageByGroup(this.conversation[0]).subscribe(
        reschatMessages=>{reschatMessages.forEach(m => {
          if(m.messageUser.idUser==this.sessionId){
            m.me=true;
          }
          else{
            m.me=false;
          }
          console.log("idSession==>"+this.sessionId+" idUser Send ===>"+m.messageUser.idUser+" me value==>"+m.me)
        });;console.log(reschatMessages+"====>message"); this.chatMessages=reschatMessages});

     
    this.items = [
      {
          icon: 'pi pi-heart',
          command: () => {
            
             console.log("hhhhhhh heart") ;
          }
      },
      {
          icon: 'pi pi-thumbs-up',
          command: () => {
             console.log("hhhhhhh like");
          }
      },
      {
          icon: 'pi pi-thumbs-down',
          command: () => {
            console.log("hhhhhhh disheart");
          }
      }
  ];


  }


}
