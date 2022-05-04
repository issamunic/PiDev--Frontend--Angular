import { Component, OnInit } from '@angular/core';
import {CodeInvitationCompany} from "../entity/code-invitation-company";
import {CodeInvitationCompanyService} from "../services/houssem/code-invitation-company.service";
import {User} from "../entity/user";

@Component({
    selector: 'app-code-invitation',
    templateUrl: './code-invitation.component.html',
    styleUrls: ['./code-invitation.component.scss']
})
export class CodeInvitationComponent implements OnInit {
    // @ts-ignore
    code : CodeInvitationCompany;
    codeadd : CodeInvitationCompany;
    Allcode: CodeInvitationCompany[];
    msg : any
    codetext:string;
    codeinput: any;
    id : any;
    truefalse: any;
    msgarea: any;
    Modifyoradd : boolean = false ;
    user : User;


    constructor(private servicecodde:CodeInvitationCompanyService) { }

    ngOnInit(): void {
        this.servicecodde.GetAllCodeInvitationCompany().subscribe(res=>this.Allcode=res);
        this.codetext = "NuuuN Please add a code";
        this.id = 1;
        this.servicecodde.getByCompany(this.id).subscribe(res => {
            this.code=res
            // @ts-ignore
            if (res !=null){this.codetext = res.codeInvitation;this.Modifyoradd = true;
            }
            console.log(this.code);
            console.log(this.Modifyoradd);
        });
    }


    AddOrModify() {
        if (this.Modifyoradd == false){
            // @ts-ignore
            // @ts-ignore
            this.user={idUser:1};
            // @ts-ignore
            this.codeadd={codeInvitation:this.codeinput,UserCompany:this.user};
            // @ts-ignore
            let resp=this.servicecodde.AddCodeInvitationCompany( this.codeadd);
            resp.subscribe((data)=> {
                console.log(data)
                if (data== 'true'){
                    this.msg = "Code Added"
                    console.log(this.msg)
                    window.location.reload();
                }
                else {
                    this.msg = "Code used , Try an other code"
                }
            });

        }
        if (this.Modifyoradd == true){
            // @ts-ignore
            this.code.codeInvitation = this.codeinput;
            let resp=this.servicecodde.updateCodeInvitationCompany(this.code);
            resp.subscribe((data)=> {
                console.log(data)
                if (data== 'true'){
                    this.msg = "Code Modified"
                    console.log(this.msg)
                    window.location.reload();
                }
                else {
                    this.msg = "Code used , Try an other code"
                }
            });
        }

        this.servicecodde.GetAllCodeInvitationCompany().subscribe(res1 => {
            console.log(res1);
        })

        this.servicecodde.getById(this.id).subscribe(res => {
            console.log(res);
        })
    }


    delete(){
        let resp= this.servicecodde.DeleteCodeInvitationCompany(this.code.idCodeInvitationCompany);
        resp.subscribe((data)=>this.msg=data);
    }
}
