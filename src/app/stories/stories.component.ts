import { Component, OnInit } from '@angular/core';

import { StoriesService } from '../services/stories/stories.service';
import { AuthService } from './../services/auth/auth.service';
import { stories } from '../../stories';


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  constructor( private ss : StoriesService ,private auth : AuthService) { }

  stories:stories;
  ngOnInit(): void {

    this.ss.getFollowersStorie().subscribe(
      resltats=>{console.log("sss"+resltats); this.stories=resltats});
      console.log(this.stories+"---ss")

  }

}
