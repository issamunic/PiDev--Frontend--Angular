import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../model/user';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { UserService } from '../services/user/user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {

  constructor(private httpClient: HttpClient, private userService: UserService, private sanitizer: DomSanitizer, private userAuthService: UserAuthService) { }

  dateString: string;
  uploadedImage: File;
  dbImage: any;//image de l'utilisateur
  postResponse: any;
  successResponse: string;
  //image: any;
  user: User;
  userUpdate: User;
  //img:any;
  famaUplaod:boolean=false;
  kamel:boolean=false;

  ngOnInit(): void {
    //this.showImage("WhatsApp Image 2022-01-22 at 21.38.40.jpeg");
    this.displayUserData();
    this.user = {};
    this.userUpdate = {};
  }

  displayUserData() {
    this.userService.getCurrentUserAuth().subscribe(res => {
      this.user = res;
      this.showImageUser(res['idUser']);
      this.user['FirstNameEmploye'] = res['firstNameEmploye'];
      this.user['LastNameEmploye'] = res['lastNameEmploye'];
      this.user['login'] = res['login'];
      if (res['birthDateEmploye'] != null) {
        this.user['BirthDateEmploye'] = res['birthDateEmploye'];
        this.dateString = formatDate(this.user['BirthDateEmploye'], 'yyyy/MM/dd', 'en-US');
        this.user['BirthDateEmploye'] = new Date(this.dateString);
      }
      //console.log(formatDate(this.user['BirthDateEmploye'],'yyyy/MM/dd','en-US'));
    });
  }

  showImageUser(id) {
    this.userService.getObjectImageForUser(id)
      .subscribe(
        res => {
          if (res != null) {
            this.postResponse = res;
            this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
          } else {
            this.dbImage = 'assets/public/user.png';
          }

        }
      );
  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
    this.famaUplaod=true;
  }

  imageUploadAction() {
    this.user['firstNameEmploye'] = this.user.FirstNameEmploye;
    this.user['lastNameEmploye'] = this.user.LastNameEmploye;
    this.user['birthDateEmploye'] = this.user.BirthDateEmploye;

    this.userService.modifyUser(this.user).subscribe((response: any) => {
      this.kamel=true;

      const imageFormData = new FormData();
      imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
      this.httpClient.post('http://localhost:8087/SpringMVC/image/upload/', imageFormData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.postResponse = response;
            this.successResponse = this.postResponse.body.message;
            this.displayUserData();
            //------refrech page
            window.location.reload();
          } else {
            this.successResponse = 'Image not uploaded due to some error!';
          }
        }
        );
    });

    if(this.kamel && this.famaUplaod===false){
      window.location.reload();
    }
    /*
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    this.httpClient.post('http://localhost:8087/SpringMVC/image/upload/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.postResponse = response;
            this.successResponse = this.postResponse.body.message;
            this.displayUserData();
            //------refrech page
            window.location.reload();
          } else {
            this.successResponse = 'Image not uploaded due to some error!';
          }
        }
      );
      */
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


  /*showImageUser(id) {
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
  }*/
}
