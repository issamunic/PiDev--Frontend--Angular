import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './../services/auth/auth.service';
import { GroupsService } from '../services/groups/groups.service';
import { ChatService } from '../services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';





@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  reactChat;
  chatMessageons : any[];
@Input() conversation;
@Input() groupNameUpdaet;



constructor( private activatedRoute: ActivatedRoute , private chatServices:ChatService ,  private groupsService : GroupsService ,private auth : AuthService) { }

  items: MenuItem[];
  id:any;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
      console.log("user id ====>"+this.id)
    
    this.auth.auth().subscribe(res =>{
    console.log(res);
    localStorage.setItem('token', res['jwtToken']);
    console.log(localStorage.getItem('token'));

let x=10;
     this.groupsService.getMessageByGroup(x).subscribe(
      resltat=>{
        console.log("chatbox ----- "+resltat);
         this.chatMessageons=resltat
      });


   });
   
    
     
    this.items = [
      {
          icon: 'bi bi-emoji-smile-fill',
          command: () => {
             this.reactChat.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          icon: 'pi pi-refresh',
          command: () => {
             this.reactChat.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
            this.reactChat.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      }
  ];

  }

  submitMessage(event){
    let value = event.target.value;
    var time = new Date();
    var times = (time.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }));
    if(value!=' '){
      console.info("manajmouch notou espace");
      event.target.value = '';
      this.conversation[2] = value;
      this.conversation[4] = times
      this.conversation.push({
      message : value,
      time:times,
    })
  }
}
}
