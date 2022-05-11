import { Component, OnInit } from '@angular/core';
import { Profession } from '../model/profession';
import { User } from '../model/user';
import { ProfessionService } from '../services/domain_profession/profession.service';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss']
})
export class ProfessionComponent implements OnInit {

  professions: Profession[];
  synonyms: Profession[];
  listSearchProfessionResult: Profession[];

  selectedProfession: Profession;
  synonymSelectedProfession: Profession;

  valueSearch: string;
  hiddenBtn: boolean = true;
  hiddenBtnAddProfession: boolean = true;

  messageAddProfession: string = "";

  user: User;

  constructor(private professionService: ProfessionService, private userService: UserService, private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.user = {};
    this.displayUserData();
    this.setProfessionsToSelectedList();
  }

  displayUserData() {
    this.userService.getCurrentUserAuth().subscribe(res => {
      this.user = res;
      if (res['profession'] != null) {
        this.user.profession = res['profession']['name'];
      }
      this.user.FirstNameEmploye=res['firstNameEmploye']+" "+res['lastNameEmploye'];
      console.log(res);
      console.log(this.user);
    });
  }

  setProfessionsToSelectedList() {
    this.professionService.getProfessions().subscribe((res: any) => {
      this.professions = res;
      this.selectedProfession = this.professions[0];
      this.hiddenBtn = false;
      this.getSynonymes();
    });
  }

  getSynonymes() {
    if (this.professions.length != 0) {
      this.professionService.synonyms(this.selectedProfession.name).subscribe((res: any) => {
        this.synonyms = res;
      });
    }


  }

  sysnonymeSelected() {
    //alert("synonymSelectedProfession : "+this.synonymSelectedProfession);
  }

  onSearchCustomer() {
    this.hiddenBtnAddProfession = false;
    this.messageAddProfession = "";
    //console.log(this.valueSearch);
    this.professionService.searchProfession(this.valueSearch).subscribe((res: any) => {
      //this.listSearchProfessionResult=res;
      if (res != null) {
        if (this.valueSearch != "" && res['length'] != 0) {
          this.hiddenBtn = false;
          this.hiddenBtnAddProfession = false;
          //console.log("length : "+res['length']);
          this.professions = res
          this.getSynonymes();
        }
        else if (this.valueSearch != "" && res['length'] == 0) {
          this.professions = [];
          this.synonyms = [];
          this.hiddenBtn = true;
          this.hiddenBtnAddProfession = false;
        }
        else {
          this.hiddenBtn = true;
          this.hiddenBtnAddProfession = true;
          console.log("mot vide");
          this.setProfessionsToSelectedList();
        }
      }

    });
  }

  professionChoosed() {
    //alert("profession choosed : "+this.valueSearch);

    //asign this profession to the current User
    console.log(this.selectedProfession.name);
    this.user.profession = this.selectedProfession.name;
    this.userService.assignCurrentUserToProfession(this.selectedProfession.idProfession).subscribe(res => {
      console.log(res);
    });
  }

  addThisProfession() {
    //alert("profession added : "+this.valueSearch);
    this.professionService.addProfession(this.valueSearch).subscribe((res: string) => {
      console.log("value add profession : " + res);
      this.messageAddProfession = res;

      if (res !== 'already exist !!') {
        this.user.profession = this.valueSearch;
        this.setProfessionsToSelectedList();
        this.valueSearch = "";
      }

    });
  }




  



}
