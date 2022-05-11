import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  PATH_API="http://localhost:8087/SpringMVC";

  constructor(private httpClient: HttpClient) { }

  getDomains(){
    return this.httpClient.get(this.PATH_API+"/domain/retrieve-all-domains/");
  }

  synonyms(nameDomain:string){
    return this.httpClient.get(this.PATH_API+"/DomainSynonym/synonyms/"+nameDomain);
  }

  searchDomain(searchedDomain:string){
    return this.httpClient.get(this.PATH_API+"/DomainSynonym/search?keyword="+searchedDomain);
  }

  addDomain(domain:string){
    return this.httpClient.post(this.PATH_API+"/DomainSynonym/addDomainAndAssignToUser?word="+domain,null,{responseType:'text'});
  }

}
