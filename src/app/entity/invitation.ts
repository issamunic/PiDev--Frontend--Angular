import {StatusInvitation} from "./status-invitation";

export class Invitation {
    idInvitation:number
    DateCreationInvitation:Date
    DateAcceptInvitation:Date
    StatusInvitation:StatusInvitation
    MailEmployee:String
    Number:String
  constructor(
    idInvitation:number,
    DateCreationInvitation:Date,
    DateAcceptInvitation:Date,
    StatusInvitation:StatusInvitation,
    MailEmployee:String,
    Number:String,

    User:bigint

  ) {
  }
}
