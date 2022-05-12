import { Component, OnInit } from '@angular/core';
import { Claim } from '../api/claim';
import { ClaimServiceService } from '../service/claim-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';




@Component({
  selector: 'app-add-claim',
  providers: [MessageService, ConfirmationService],
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.scss']
})


export class AddClaimComponent implements OnInit {

  valRadio:any;
  valSlider : any = 50;
  valTextArea : any="";
  claim : Claim ;
  msgs : any;
  severity : any;
  display: boolean = false;



  


  constructor(private claimServices:ClaimServiceService,private messageService: MessageService) {}
  public addClaim(){
    this.claim = new Claim();
    this.claim.other=this.valTextArea;
    this.claim.severity=this.valSlider;
    this.claim.type = this.valRadio;
    console.log(this.claim);
    this.claimServices.postclaim(this.claim);
    //this.severity ="success";
    //this.msgs = "Claim added";
    console.log(this.claim);

    this.messageService.add({severity:'success', summary: 'Success', detail: 'Claim was added with successful'});


  }

  showDialog() {
    this.display = true;
}


onReject() {
  this.messageService.clear('c');
}






  ngOnInit(): void {
    
  }

}
