import {StatusInvitation} from "./status-invitation";
import {User} from "./user";

export class Invitation {
    idInvitation:number
    DateCreationInvitation:Date
    DateAcceptInvitation:Date
    StatusInvitation:StatusInvitation
    MailEmployee:String
    Number:String
    userSender:User
  constructor(
    idInvitation:number,
    DateCreationInvitation:Date,
    DateAcceptInvitation:Date,
    StatusInvitation:StatusInvitation,
    MailEmployee:String,
    Number:String,
    userSender:User

  ) {
  }
}
