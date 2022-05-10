import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../model/user';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { UserService } from '../services/user/user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {

  constructor(private httpClient: HttpClient, private userService: UserService, private sanitizer: DomSanitizer, private userAuthService: UserAuthService) { }

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
    this.displayUserData();
    this.user = {};
    this.userUpdate = {};
  }

  displayUserData() {
    this.userService.getCurrentUserAuth().subscribe(res => {
      this.user = res;
      this.showImageUser(res['idUser']);
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
  }

}
