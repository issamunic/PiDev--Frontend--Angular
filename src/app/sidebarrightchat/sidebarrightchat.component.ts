import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './../services/auth/auth.service';
import { ChatService } from '../services/chat/chat.service';
import { GroupsService } from '../services/groups/groups.service';



@Component({
  selector: 'app-sidebarrightchat',
  templateUrl: './sidebarrightchat.component.html',
  styleUrls: ['./sidebarrightchat.component.scss']
  
})
export class SidebarrightchatComponent implements OnInit {
  @Input() conversation;
  links;
  files;
  newNameGroup:string;
  Users=[
    {id:1, image:'Capture.PNG',nom:'hammami',prenom:'mongi'},
    {id:2, image:'Capture.PNG',nom:'jelassi',prenom:'ikram'},
    {id:8, image:'Capture.PNG',nom:'hammami',prenom:'eline'},
  ]
  constructor( private chatServices:ChatService , private auth : AuthService , private gs : GroupsService ) { }
  title = 'appBootstrap';
  groupNameUpdaet

  public isCollapsed = false;
  
  items: MenuItem[];

  updateGroupName(event){
    this.newNameGroup=event.target.value;
    console.info(this.newNameGroup);

  }

  ngOnInit(): void {
    this.auth.auth().subscribe(res =>{
         console.log(res);
         localStorage.setItem('token', res['jwtToken']);
         console.log(localStorage.getItem('token'));

         console.log("--------------------------------"+this.conversation[0]);

         

          this.chatServices.getFileFromGroup(this.conversation[0]).subscribe(
            resltat=>{console.log(resltat); this.files=resltat});

            this.chatServices.getLinks(this.conversation[0]).subscribe(
              resltat=>{console.log(resltat); this.links=resltat});
              
        this.gs.RenameGroup(this.conversation[0],this.newNameGroup).subscribe();
          
          
        });
        console.info(this.links);
        console.info(this.newNameGroup);
         
           
  }

  deleteMember(id){
    let value = this.Users.findIndex(e=>e.id == id);
    
    let valueText ="you removed "+id+" from the groups";
    this.conversation.lastMassage = valueText;
    if(value!== -1 ){
      this.Users.splice(value,1);
      this.conversation.messages.push({
        id:1,
        body : valueText,
        time:'10:10',
        me:true,
        action:true
      })
    }

    console.log("delete id : "+id);
  }

  
}


