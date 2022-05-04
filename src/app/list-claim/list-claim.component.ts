import { _YAxis } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';
import { ClaimServiceService } from 'src/app/service/claim-service.service'
import { Claim } from '../api/claim';


@Component({
  selector: 'app-list-claim',
  templateUrl: './list-claim.component.html',
  styleUrls: ['./list-claim.component.scss']
})
export class ListClaimComponent implements OnInit {

  //rcvData : Array<Claim>;
  rcvData: Claim[];
  actualValue : Claim;
  

  constructor(private claimServices:ClaimServiceService) { }

  public listAllClaims(){
    
    this.claimServices.listAllClaimsbyId().subscribe(
        
        
      data => {
        this.rcvData = data;
        console.log(this.rcvData); 
      }
    );
  }

  

  ngOnInit(): void {
    this.listAllClaims();

   

  }



}
