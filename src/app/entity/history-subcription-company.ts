import {User} from "./user";

export class HistorySubcriptionCompany {
    idHistorySubcriptionCompany:Number
    NbrEmployeeAddedToMax:Number
    DateHistorySubcriptionCompany:Date
    userHistory: User;
  constructor(
    idHistorySubcriptionCompany:Number,
    NbrEmployeeAddedToMax:bigint,
    DateHistorySubcriptionCompany:Date,

    CompanyId:bigint
  ) {
  }
}
