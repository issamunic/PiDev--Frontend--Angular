import { Component, OnInit } from '@angular/core';
import {CodeInvitationCompany} from "../entity/code-invitation-company";
import {CodeInvitationCompanyService} from "../services/houssem/code-invitation-company.service";

@Component({
  selector: 'app-code-invitation',
  templateUrl: './code-invitation.component.html',
  styleUrls: ['./code-invitation.component.scss']
})
export class CodeInvitationComponent implements OnInit {
    // @ts-ignore
    code : CodeInvitationCompany = new CodeInvitationCompany();
    Allcode: CodeInvitationCompany[];
    msg : any
    codetext:string;


  constructor(private servicecodde:CodeInvitationCompanyService) { }

  ngOnInit(): void {
      this.servicecodde.GetAllCodeInvitationCompany().subscribe(res=>this.Allcode=res);
      if (this.code.CodeInvitation == null){
          this.codetext = "NuuuN Please add a code";
      }
  }


    AddOrModify() {
      // @ts-ignore

        let resp=this.servicecodde.AddCodeInvitationCompany(this.code);
        resp.subscribe((data)=>this.msg=data);

        this.servicecodde.GetAllCodeInvitationCompany().subscribe(res1 => {
            console.log(res1);
        })

        this.servicecodde.getById(5).subscribe(res => {
            console.log(res);
        })
    }


    delete(){
        let resp= this.servicecodde.DeleteCodeInvitationCompany(2);
        resp.subscribe((data)=>this.msg=data);
    }
}
