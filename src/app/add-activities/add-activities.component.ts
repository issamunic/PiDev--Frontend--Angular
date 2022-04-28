import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { PrimeNGConfig } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { Activity } from '../api/Activity';
import { ClaimServiceService } from '../service/claim-service.service';


@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.scss']
})
export class AddActivitiesComponent implements OnInit {
  product:any;
  description : string;
  period : number;
  title : string;
  progress : string;
  tripPlanNum : number;

  event : Array<any>;
  dataProgramme : Array<any>;
  dataprogObject : Array<any>=[];
  calendarOptions: CalendarOptions;



  display : boolean = false;
  sourceActivities: Activity[]=[];
  activities: Activity[]=[];
  
    
  targetActivities: Activity[]=[];
  handleDateClick: any;
  showDialog() {
    this.display = true;
}

public programme(){
  this.claimServices.programme().subscribe(
    data => {

      this.dataProgramme = data;
     

      for(let i =0; i<Object.keys(this.dataProgramme).length;i++){
        this.dataprogObject.push(
          { title: "start : "+this.dataProgramme[i].acivity, date: this.dataProgramme[i].startActivity },
          { title: "end : "+this.dataProgramme[i].acivity, date: this.dataProgramme[i].endActivity } 
        );
      }

      this.calendarOptions =  {
        initialView: 'dayGridMonth',
        
        events: this.dataprogObject
      };
      //console.log(this.dataprogObject); 
    }
  );
}









 


  constructor(private primengConfig: PrimeNGConfig,private claimServices:ClaimServiceService) {
   }

   addActivity(){
    
    let activity = new Activity();
    activity.acivity=this.title;
    activity.progress = this.progress;
    activity.period = this.period;
    activity.activityDescription=this.description;
    console.log("t3adet");
    this.activities.push(
      {
        "activityDescription": this.description,
        "acivity": this.title,
        "period": this.period,
        "progress": this.progress
      }
    );
    console.log(this.activities);

    }

    activitiesPlanification(){
      this.claimServices.planificateActivities(this.tripPlanNum);
    }
    

   public addActivities(){
    this.claimServices.addActivities(this.activities,this.tripPlanNum);
  }

  ngOnInit(): void {

    this.programme();


    
    
    

    //this.claimServices.ActivitiesOfTripPlan(2).subscribe(activities => this.sourceActivities = activities);
    this.sourceActivities = this.activities;
    this.targetActivities = [];
    this.primengConfig.ripple = true;



  }

}
