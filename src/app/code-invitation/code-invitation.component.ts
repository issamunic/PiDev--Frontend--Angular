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
    code : CodeInvitationCompany;
    Allcode: CodeInvitationCompany[];
    msg : any
    codetext:string;
    codeinput: any;
    id : any;


  constructor(private servicecodde:CodeInvitationCompanyService) { }

  ngOnInit(): void {
      this.servicecodde.GetAllCodeInvitationCompany().subscribe(res=>this.Allcode=res);
          this.codetext = "NuuuN Please add a code";
       this.id = 43;
      this.servicecodde.getById(this.id).subscribe(res => {
          this.code=res
          // @ts-ignore
          if (res !=null){this.codetext = res.codeInvitation}
          console.log(this.code);
      });
  }


    AddOrModify() {
      // @ts-ignore

        let resp=this.servicecodde.AddCodeInvitationCompany({codeInvitation:this.codeinput});
        resp.subscribe((data)=>this.msg=data);

        this.servicecodde.GetAllCodeInvitationCompany().subscribe(res1 => {
            console.log(res1);
        })

        this.servicecodde.getById(this.id).subscribe(res => {
            console.log(res);
        })
    }


    delete(){
        let resp= this.servicecodde.DeleteCodeInvitationCompany(this.id);
        resp.subscribe((data)=>this.msg=data);
    }
}
