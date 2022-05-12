import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../api/Activity';
import { ClaimServiceService } from '../service/claim-service.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';





class TripPlan {
  tripPlanId: number;
  projectName:string;
  mission:string;
  description:string;
}

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss'],
  providers: [MessageService]

})
export class UpdateActivityComponent implements OnInit {
  activity : any;
  activityId : number;
  prog: string[];
  rcvDataTripPlan : TripPlan;
  rcvData: any = '';
  period : number;
  date: string;
  description : string;
  title : string;
  progress : string;
  dates: Date[];
  selectedTripPlan: TripPlan = new TripPlan();

  dated : any;
  datef : any;


  rangeDates: Date[];

  minDate: Date;

  maxDate: Date;

  es: any;

  invalidDates: Array<Date>


  public listAlltripplan(){
    
    this.claimServices.listTripPlan().subscribe(
  
  
  
        
        
      data => {
        
        this.rcvDataTripPlan = data;
        
        console.log(this.rcvDataTripPlan); 
        console.log(this.date)
      }
    );
  }


  public listactualActivity(id:number){
    
    this.claimServices.activitybyId(id).subscribe(
        
        
      data => {
        this.rcvData = data;
        this.date = this.rcvData.startActivity;
        this.dated =this.date.slice(0,16)
        this.datef = this.rcvData.endActivity.slice(0,16)
        this.period = this.rcvData.period;
        this.title = this.rcvData.acivity;
        this.progress = this.rcvData.progress;
        this.description = this.rcvData.activityDescription;


        console.log(this.rcvData); 
        console.log("date fin : "+ this.datef);

        console.log("notre date :  "+ this.dated);
      }
    );
  }




  constructor(private activatedroute : ActivatedRoute, private claimServices: ClaimServiceService, private messageService: MessageService) { }
  
   UpActivity(){
    
     this.activity = {
      "activityId" : this.activityId, 
      "activityDescription": this.description,
      "acivity": this.title,
      "period": this.period,
      "progress": this.progress,
      "startActivity": this.dated,
      "endActivity": this.datef
    }

    console.log("aaaaaaaaaaaa  : "+ this.activity.period);
    console.log(this.progress);
    //this.claimServices.UpdateActivity(this.activity);

    this.claimServices.UpdateActivity(this.activity,this.selectedTripPlan.tripPlanId,this.activityId)
      //this.claimServices.activitytripPlan(this.selectedTripPlan.tripPlanId,this.activityId)

    
      console.log("trip plan id : "+ this.selectedTripPlan.tripPlanId+ "activity id : "+this.activityId);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Update was successful'});

    
    }
    

    onReject() {
      this.messageService.clear('c');
  }


  

  ngOnInit(): void {

    this.claimServices.activitytripPlan(2,362);


    


    this.activityId=this.activatedroute.snapshot.params.id;
    this.listactualActivity(this.activityId);
    console.log(this.activityId);
    this.prog = [
      'inprogress',
    'done',
    'notdone'
  ];

  this.period = this.rcvData['period'];
  this.listAlltripplan();

  this.es = {
    firstDayOfWeek: 1,
    dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    dayNamesMin: [ "D","L","M","X","J","V","S" ],
    monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    today: 'Hoy',
    clear: 'Borrar'
}

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = (month === 0) ? 11 : month -1;
let prevYear = (prevMonth === 11) ? year - 1 : year;
let nextMonth = (month === 11) ? 0 : month + 1;
let nextYear = (nextMonth === 0) ? year + 1 : year;
this.minDate = new Date();
this.minDate.setMonth(prevMonth);
this.minDate.setFullYear(prevYear);
this.maxDate = new Date();
this.maxDate.setMonth(nextMonth);
this.maxDate.setFullYear(nextYear);

let invalidDate = new Date();
invalidDate.setDate(today.getDate() - 1);
this.invalidDates = [today,invalidDate];
  }



}
