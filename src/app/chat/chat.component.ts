import { Component, EventEmitter, OnInit , Output } from '@angular/core';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
 
  conversation;
  constructor() { }
  
  onConversationSelected(conversation){
    this.conversation = conversation;
  }
  ngOnInit(): void {
  }

}
