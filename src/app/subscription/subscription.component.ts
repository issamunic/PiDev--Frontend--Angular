import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
      if (this.nbremployee == null){
          this.nbremployee = "NuuuN"
      }
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
}
