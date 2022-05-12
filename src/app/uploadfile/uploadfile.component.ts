import { FileUploadModule } from 'primeng/fileupload';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss'],
  providers : [
    FileUploadModule
  ]
})
export class UploadfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
