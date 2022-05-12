import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PorfilService } from '../services/profile/porfil.service';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss']
})
export class AvatarsComponent implements OnInit {

  constructor(private profileService: PorfilService, private sanitizer: DomSanitizer) { }
  @Input() associates: any[];
  @Input() lol : any;
  ngOnInit(): void {

    //console.log("ena bdit");
    
    
    if (this.associates != null) {
      for (let j = 0; j < this.associates.length; j++) {
       // console.log("associates "+j);
        //console.log(this.associates[j]);
        if (this.associates[j]['image']!=null) {
        this.profileService.getImageByName(this.associates[j]['image']['name'])
          .subscribe((blob: any) => {
            let objectURL = URL.createObjectURL(blob);
            this.associates[j].image1 = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  
          });
        }
        else this.associates[j].image1="assets/public/user.png"
      }
    }
    else this.associates = [];
  
  

    
  }
  reload()
  {
    
  }
  display: boolean = false;

  showDialog() {
      this.display = true;
  }

}
