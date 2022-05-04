import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { Activity } from '../api/Activity';
import { ClaimServiceService } from '../service/claim-service.service';

class TripPlan {
  tripPlanId: number;
  projectName:string;
  mission:string;
  description:string;
}

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.scss'],
  providers: [MessageService]

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

  prog: string[];


  rcvDataTripPlan : TripPlan;
  tripPlans: TripPlan[];
  idTripPlan : number;
  selectedTripPlan: TripPlan = new TripPlan();

  selectprog:any;


  display : boolean = false;
  sourceActivities: Activity[]=[];
  activities: Activity[]=[];
  
    
  targetActivities: Activity[]=[];
  handleDateClick: any;
  showDialog() {
    this.display = true;
    console.log(this.targetActivities);
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




public listAllClaims(){
    
  this.claimServices.listTripPlan().subscribe(



      
      
    data => {
      
      this.rcvDataTripPlan = data;
      console.log(this.rcvDataTripPlan); 
    }
  );
}




 


  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig,private claimServices:ClaimServiceService) {

    this.prog = [
      'inprogress',
    'done',
    'notdone'
  ];

    
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
    if(this.activities.length>0){
    this.messageService.add({severity:'success', summary: 'Success', detail: 'The activity has been added'});
    }
    

    }

    activitiesPlanification(){
      //this.claimServices.planificateActivities(this.tripPlanNum);
      this.claimServices.planificateActivities(this.selectedTripPlan.tripPlanId);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'The planning was successful'});

      
    }
    

   public addActivities(){
    //this.claimServices.addActivities(this.activities,this.selectedTripPlan.tripPlanId);
    this.claimServices.addActivities(this.targetActivities,this.selectedTripPlan.tripPlanId);
    //console.log(this.claimServices.addActivities(this.targetActivities,this.selectedTripPlan.tripPlanId));
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Activities are added'});

  }

  public select(){
    console.log(this.selectedTripPlan.tripPlanId);
  }

  onReject() {
    this.messageService.clear('c');
}



  ngOnInit(): void {
    this.listAllClaims();
    this.programme();
    
    


    
    
    

    //this.claimServices.ActivitiesOfTripPlan(2).subscribe(activities => this.sourceActivities = activities);
    this.sourceActivities = this.activities;
    this.targetActivities = [];
    this.primengConfig.ripple = true;



  }

}
