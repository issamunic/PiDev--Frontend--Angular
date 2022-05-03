import { Component, EventEmitter, OnInit , Output } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { GroupsService } from '../services/groups/groups.service';
import { AuthService } from './../services/auth/auth.service';
import { chat } from '../../chat';
import { ChatService } from '../services/chat/chat.service';



@Component({
  selector: 'app-sidebarchat',
  templateUrl: './sidebarchat.component.html',
  styleUrls: ['./sidebarchat.component.scss']
})
export class SidebarchatComponent implements OnInit {

  @Output()conversationClicket: EventEmitter<any> = new EventEmitter();
  @Output()getLinksClicket: EventEmitter<any> = new EventEmitter();
  
  searchText;
  links;
/*
 conversations=[
    {id:1, name:"ikram jelassi",time:"18:03",lastMassage:"hey wink enti tawa",me:true,messages:[
      {id:1, body:"wink" , time : '8:20', me:true},
      {id:2, body:"wink cv" , time : '8:20', me:false},
      {id:3, body:"hani hmd" , time : '8:21', me:true},
      {id:4, body:"hey kifeh baaed" , time : '8:21', me:false}
    ]},
    {id:2, name:"habib yeddes",time:"18:03",lastMassage:"hey wink enti tawa",me:true,messages:[
      {id:1, body:"wink" , time : '8:20', me:true},
      {id:2, body:"wink cv" , time : '8:20', me:false}
    ]},
    {id:3 ,name:"ben kawel samar",time:"18:03",lastMassage:"hey wink enti tawa",me:false,seen:false},
    {id:4,name:"mansouri karim",time:"18:03",lastMassage:"hey wink enti tawa",me:false,seen:true},
    {id:5, name:"jelaassi emna",time:"18:03",lastMassage:"hey wink enti tawa"},
    {id:6,name:"karim hammami",time:"18:03",lastMassage:"hey wink enti tawa",me:true,},
    {id:7,name:"mongi hammami",time:"18:03",lastMassage:"hey wink enti tawa"},
    {id:8,name:"leo messi",time:"18:03",lastMassage:"hey wink enti tawa"},
    {id:9,name:"khaled badra",time:"2day",lastMassage:"hhhh ok"},
    {id:10,name:"iyed jaafra",time:"3 week",lastMassage:"first test"},
    {id:11,name:"habib yeddes",time:"18:03",lastMassage:"hey wink enti tawa"},
    {id:12,name:"ben kawel samar",time:"18:03",lastMassage:"hey wink enti tawa"},
    {id:13,name:"mansouri karim",time:"18:03",lastMassage:"hey wink enti tawa"},

  ];
   */
  conversation;
  
  //get filteredConversation(){
   // return this.conversations.filter((conversation => {
     // return conversation.name.includes(this.searchText)
   // }))
 // }

 conversations:any;
  constructor( private chatServices:ChatService ,  private groupsService : GroupsService ,private auth : AuthService) { }
  
  ngOnInit(): void {
    this.auth.auth().subscribe(res =>{
         console.log(res);
         localStorage.setItem('token', res['jwtToken']);
         console.log(localStorage.getItem('token'));

         console.log("--------------------------------");

         this.groupsService.getGroups().subscribe(
          resltat=>{console.log(resltat); this.conversations=resltat});
          
        });
        console.info(this.conversations);
        console.error("sssssssssssss"+this.conversation[0]);

        
           
  }

}
