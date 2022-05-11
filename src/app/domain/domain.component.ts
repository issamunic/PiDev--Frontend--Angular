import { Component, OnInit } from '@angular/core';
import { Domain } from '../model/domain';
import { User } from '../model/user';
import { DomainService } from '../services/domain_profession/domain.service';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {

  domains: Domain[];
  synonyms: Domain[];
  listSearchDomainResult: Domain[];

  selectedDomain: Domain;
  synonymSelectedDomain: Domain;

  valueSearch:string;
  hiddenBtn:boolean=true;

  user: User;

  constructor(private domainService: DomainService,private userService:UserService,private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.user = {};
    this.displayUserData();
    this.setDomainsToSelectedList();
  }

  displayUserData() {
    this.userService.getCurrentUserAuth().subscribe(res => {
      this.user = res;
      if(res['domain']!=null){
        this.user.domain=res['domain']['name'];
      }
      console.log(res);
      console.log(this.user);
    });
  }

  setDomainsToSelectedList() {
    this.domainService.getDomains().subscribe((res: any) => {
      this.domains = res;
      this.selectedDomain=this.domains[0];
      this.hiddenBtn=false;
      this.getSynonymes();
    });
  }

  getSynonymes() {
    if(this.domains.length!=0){
      this.domainService.synonyms(this.selectedDomain.name).subscribe((res:any)=>{
        this.synonyms=res;
      });
    }
    
    
  }

  sysnonymeSelected(){
    //alert("synonymSelectedDomain : "+this.synonymSelectedDomain);
  }

  onSearchCustomer(){
    //console.log(this.valueSearch);
    this.domainService.searchDomain(this.valueSearch).subscribe((res:any)=>{
      //this.listSearchDomainResult=res;
      if(res!=null){
        if(this.valueSearch!="" && res['length']!=0){
          this.hiddenBtn=false;
          //console.log("length : "+res['length']);
          this.domains=res
          this.getSynonymes();
        }
        else if(this.valueSearch!="" && res['length']==0){
          this.domains=[];
          this.synonyms=[];
          this.hiddenBtn=true;
        }
        else{
          this.hiddenBtn=true;
          console.log("mot vide");
          this.setDomainsToSelectedList();
        }
      }
      
    });
  }

  domainChoosed(){
    //alert("domain choosed : "+this.valueSearch);

    //asign this domain to the current User
    console.log(this.selectedDomain.name);
    this.user.domain=this.selectedDomain.name;
    this.userService.assignCurrentUserToDomain(this.selectedDomain.idDomain).subscribe(res=>{
      console.log(res);
      
    });

  }

}
