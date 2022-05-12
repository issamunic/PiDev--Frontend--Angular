import { Component, OnInit } from '@angular/core';
import { Claim } from '../api/claim';
import { ClaimServiceService } from '../service/claim-service.service';

@Component({
  selector: 'app-listallclaims',
  templateUrl: './listallclaims.component.html',
  styleUrls: ['./listallclaims.component.scss']
})
export class ListallclaimsComponent implements OnInit {

  rcvData: Claim[];
  actualValue : Claim;
  

  constructor(private claimServices:ClaimServiceService) { }

  public listAllClaims(){
    
    this.claimServices.listAllClaims().subscribe(
        
        
      data => {
        this.rcvData = data;
        console.log(this.rcvData); 
      }
    );
  }

  public action(id){
    console.log("id : "+ id);
    this.claimServices.action(id);
    
  }

  

  ngOnInit(): void {
    this.listAllClaims();
    console.log('anas');

   

  }

}
