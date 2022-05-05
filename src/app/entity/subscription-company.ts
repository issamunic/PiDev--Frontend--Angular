import {User} from "./user";

export class SubscriptionCompany {
    idSubscriptionCompany:Number
    nbrEmployeeMax:Number
    company: User;
  constructor(
    idSubscriptionCompany:Number,
    nbrEmployeeMax:Number,
    company:User,
  ) {
  }
}
