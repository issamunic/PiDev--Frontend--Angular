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
      this.servicesub.getByUser({idUser:1}).subscribe(res => {
          this.subobj=res
          // @ts-ignore
          if (res !=null){this.nbremployee = res.nbrEmployeeMax}
          console.log(this.subobj);
      });
  }


    sub() {
      if (this.custom<50){

          // @ts-ignore
          this.nbr= Math.round( this.custom *0.2 );

          // @ts-ignore
          this.price = this.custom*10 ;

      }
      if (this.custom<100 && this.custom>=50){

          // @ts-ignore
          this.nbr =Math.round( this.custom *0.1 );
          // @ts-ignore
          this.price = this.custom*10 ;
      }
      if (this.custom>=100){
          // @ts-ignore
          this.nbr =Math.round( this.custom *0.05 ) ;
          // @ts-ignore
          this.price = this.custom*10
      }
    }

    buy25() {
        // @ts-ignore
        this.subobj.nbrEmployeeMax = 25
        let resp= this.servicesub.UpgradeSubscriptionCompany(this.subobj);
        resp.subscribe((data)=>this.msg=data);
        window.location.reload();
    }

    buy50() {
        // @ts-ignore
        this.subobj.nbrEmployeeMax = 50
        let resp= this.servicesub.UpgradeSubscriptionCompany(this.subobj);
        resp.subscribe((data)=>this.msg=data);
        window.location.reload();
    }

    buy100() {
        // @ts-ignore
        this.subobj.nbrEmployeeMax = 100
        let resp= this.servicesub.UpgradeSubscriptionCompany(this.subobj);        resp.subscribe((data)=>this.msg=data);
        window.location.reload();

    }

    buycustom() {
        let nbrr = this.custom
        // @ts-ignore
        this.subobj.nbrEmployeeMax = nbrr
        let resp= this.servicesub.UpgradeSubscriptionCompany(this.subobj);        resp.subscribe((data)=>this.msg=data);
        window.location.reload();
    }
}
