import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './../services/auth/auth.service';
import { ChatService } from '../services/chat/chat.service';
import { GroupsService } from '../services/groups/groups.service';
import { UsersService } from '../services/users/users.service';

import { groups } from '../../groups';




@Component({
  selector: 'app-sidebarrightchat',
  templateUrl: './sidebarrightchat.component.html',
  styleUrls: ['./sidebarrightchat.component.scss']
  
})
export class SidebarrightchatComponent implements OnInit {
  @Input() conversation;
  links : any;
  files : any;
  newNameGroup:string;
  detailsChat : any;
  users : any[];
  group = new groups();
 
  constructor( private chatServices:ChatService ,private us:UsersService , private auth : AuthService , private gs : GroupsService ) { }
  title = 'appBootstrap';
  groupNameUpdaet

  public isCollapsed :boolean;
  
  public onSaveGroupTypeChanged(value:boolean){
    this.isCollapsed = value;
    if(this.isCollapsed){
      this.group.groupeSecuritytype="secure";
   // this.gs.updateEtatGroup(this.conversation[0],30,this.group.groupeSecuritytype).subscribe(res=>{this.listUser=res});
  }
    if(!this.isCollapsed){
      this.group.groupeSecuritytype="simple";
      console.log("type=>"+this.group.groupeSecuritytype);
      
    }
    console.log(this.isCollapsed+"-------------")
}
updateGroupSecurity(value){
  this.group.groupeSecuritytype="secure";
  console.log("ssss"+this.group.dureeExpiration);
}

  items: MenuItem[];

  idActive=false;
  

  updateGroupName(event){
    this.newNameGroup=event.target.value;
    console.info(this.newNameGroup);
    this.gs.RenameGroup(this.conversation[0],this.newNameGroup).subscribe(res=>{this.newNameGroup=res});

    console.info(this.newNameGroup);

  }

  ngOnInit(): void {
    console.log("hhhh "+this.idActive);
    this.auth.auth().subscribe(res =>{
         localStorage.setItem('token', res['jwtToken']);
      });

      this.us.getAllUsers().subscribe(
        resltat=>{console.log("-----------"+resltat); this.users=resltat});


      this.chatServices.getFileFromGroup(this.conversation[0]).subscribe(
        resltat=>{console.log(resltat); this.files=resltat});

      this.chatServices.getLinks(this.conversation[0]).subscribe(
          resltat=>{console.log(resltat); this.links=resltat});

      this.gs.getDetailGroup(this.conversation[0]).subscribe(
        resdetailsChat=>{console.log(resdetailsChat); this.detailsChat=resdetailsChat});
        console.log(this.detailsChat.length);

        
         
           
  }

  listUser : any;
  deleteMember(id,idGroup){
    this.gs.deleteUserById(idGroup,id).subscribe(res=>{this.listUser=res});
    let valueText ="you removed "+id+" from the groups";
    this.conversation.lastMassage = valueText;
    for (let i = 0; i < this.detailsChat.length; i++ ) {
      if(this.detailsChat[i][0]==id){
      console.log("hey hey heey "+this.detailsChat[i][0]);
      this.detailsChat.splice(this.detailsChat[i],1);
      this.conversation.messages.push({
        id:1,
        body : valueText,
        time:'10:10',
        me:true,
        action:true
        
      })
    }
    }

  }



  addUserToGroup(user,idGroup){
    let exist=false;
    this.gs.addUserToGroup(idGroup,user[0]).subscribe(res=>{this.listUser=res});
    console.log(user[0]+" id User")
    console.log(user+"==> User")
    let valueText ="you add member to the groups";
    this.conversation.lastMassage = valueText;
      for (let i = 0; i < this.detailsChat.length; i++ ) {
        if(this.detailsChat[i][0]==user[0]){
          exist=true;
        }
      }

      if(!exist){
        console.log("hey hey heey "+this.detailsChat[0]);

        this.detailsChat.push({
        [0]:user[0],
        [1] : user[1],
        [2]:user[2],
        [3]:user[3],
        
      })
        console.log(this.detailsChat)
    
    }

  }


  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  
}


