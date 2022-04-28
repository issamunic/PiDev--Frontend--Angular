import { PorfilService } from './../services/profile/porfil.service';
import { Component, OnInit, Sanitizer, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-mini-profil',
  templateUrl: './mini-profil.component.html',
  styleUrls: ['./mini-profil.component.scss']
})
export class MiniProfilComponent implements OnInit {

  constructor(private profileService : PorfilService, private sanitizer: DomSanitizer) { }
  user : any;
  @Input() id; 
  name : string;
  image : any;
  ngOnInit(): void {
      this.profileService.getUserInfo(this.id).subscribe( res => 
        {
          
          this.user = res;
          console.log(this.user);
          //this.name = this.user['firstNameEmploye']+" "
          //this.name += this.user['lastNameEmploye']



          //console.log("user ba3ed ma stanna: "+this.name);
          
          /*console.log(this.user['image']['name']);
          
          

          this.profileService.getImageByName(this.user['image']['name'])
          .subscribe((blob : any) => {
            let objectURL = URL.createObjectURL(blob);       
            this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

          });*/
          
        })

        

        console.log("user "+this.user);
        
  }

}
