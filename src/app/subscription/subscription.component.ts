import { Component, OnInit } from '@angular/core';
import {SubscriptionCompanyService} from "../services/houssem/subscription-company.service";
import {SubscriptionCompany} from "../entity/subscription-company";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
    custom: bigint;
    nbr : bigint;
    price : bigint;
    nbremployee: String;
    Allsub: SubscriptionCompany[];
    subobj : Object;
     id: any;
     msg: any;
  constructor(private servicesub:SubscriptionCompanyService) { }

  ngOnInit(): void {

      this.servicesub.GetAllSubscriptionCompany().subscribe(res=>this.Allsub=res);
      this.nbremployee = "NuuuN";
      this.id = 1;
      this.servicesub.getById(this.id).subscribe(res => {
          this.subobj=res
          // @ts-ignore
          if (res !=null){this.nbremployee = res.nbrEmployeeMax}
          console.log(this.subobj);
      });
  }


    sub() {
      if (this.custom<100){

          // @ts-ignore
          this.nbr= Math.round( this.custom *0.1 );

          // @ts-ignore
          this.price = this.custom*10 ;

      }
      if (this.custom<500 && this.custom>=100){

          // @ts-ignore
          this.nbr =Math.round( this.custom *0.2 );
          // @ts-ignore
          this.price = this.custom*10 ;
      }
      if (this.custom>=500){
          // @ts-ignore
          this.nbr =Math.round( this.custom *0.3 ) ;
          // @ts-ignore
          this.price = this.custom*10
      }
    }

    buy100() {
        let resp= this.servicesub.UpgradeSubscriptionCompany({idSubscriptionCompany:1,nbrEmployeeMax:110});
        resp.subscribe((data)=>this.msg=data);
    }

    buy250() {
        let resp= this.servicesub.UpgradeSubscriptionCompany({idSubscriptionCompany:1,nbrEmployeeMax:300});
        resp.subscribe((data)=>this.msg=data);
    }

    buy500() {
        let resp= this.servicesub.UpgradeSubscriptionCompany({idSubscriptionCompany:1,nbrEmployeeMax:650});
        resp.subscribe((data)=>this.msg=data);

    }

    buycustom() {
        let nbrr = this.custom + this.nbr
        let resp= this.servicesub.UpgradeSubscriptionCompany({idSubscriptionCompany:1,nbrEmployeeMax:nbrr});
        resp.subscribe((data)=>this.msg=data);
    }
}
