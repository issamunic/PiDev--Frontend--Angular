import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {

  constructor(private router:Router,private httpClient: HttpClient, private userService: UserService, private sanitizer: DomSanitizer, private userAuthService: UserAuthService) { }

  value: string;

  date3: Date;

  value3: string;



  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  //image: any;


  img:any;//image de l'utilisateur

  ngOnInit(): void {
    //this.showImage("WhatsApp Image 2022-01-22 at 21.38.40.jpeg");
    this.setCurrentUserImage();
  }

  setCurrentUserImage() {
    this.userService.getCurrentUserAuth().subscribe(res => {
      this.showImageUser(res['idUser']);
    });
  }

  showImageUser(id) {
    this.userService.getImageUser(id)
      .subscribe((blob: any) => {
        if (blob != null) {
          if (blob['size'] === 0) {
            this.img = 'assets/public/user.png';
          } else {
            let objectURL = URL.createObjectURL(blob);
            this.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            console.log(this.img);
          }
        }
      });
  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
    
  }

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    this.httpClient.post('http://localhost:8087/SpringMVC/image/upload/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
          this.setCurrentUserImage();
          //------refrech page
          window.location.reload();
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );
  }

  /*viewImage() {
    this.httpClient.get('http://localhost:8087/SpringMVC/image/get/info/' + this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }*/

  /*showImage(image: any) {
    this.httpClient.get('http://localhost:8087/SpringMVC/image/get/info/' + image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }*/

}
