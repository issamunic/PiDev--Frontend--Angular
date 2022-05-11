import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  PATH_API="http://localhost:8087/SpringMVC";

  constructor(private httpClient: HttpClient) { }

  getProfessions(){
    return this.httpClient.get(this.PATH_API+"/profession/retrieve-all-professions/");
  }

  synonyms(nameProfession:string){
    return this.httpClient.get(this.PATH_API+"/ProfessionSynonym/synonyms/"+nameProfession);
  }

  searchProfession(searchedProfession:string){
    return this.httpClient.get(this.PATH_API+"/ProfessionSynonym/search?keyword="+searchedProfession);
  }

  addProfession(profession:string){
    return this.httpClient.post(this.PATH_API+"/ProfessionSynonym/addProfessionAndAssignToUser?word="+profession,null,{responseType:'text'});
  }
}
