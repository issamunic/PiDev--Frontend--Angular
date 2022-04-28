import { _YAxis } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';
import { ClaimServiceService } from 'src/app/service/claim-service.service'

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  recvData: any;
    data1: any;
    data2: any;
    data3: any;
    tabxweek : Array<string> = [];
    tabyweek : Array<string> = [];
    tabxmounth : Array<string> = [];
    tabymounth : Array<string> = [];
    tabxyear : Array<string> = [];
    tabyyear : Array<string> = [];
    data11: any;
    data22: any;
    data33: any;
    tabxweek1 : Array<string> = [];
    tabyweek1 : Array<string> = [];
    tabxmounth1 : Array<string> = [];
    tabymounth1 : Array<string> = [];
    tabxyear1 : Array<string> = [];
    tabyyear1 : Array<string> = [];
    lineData: any;
    lineData1: any;
    lineData2: any;

    numberClaimbyYear :any =0;
    numberClaimbyMounth :any =0;
    numberClaimbyweek :any =0;

    

    barData: any;

    pieData: any;
    pieData1: any;
    pieData2: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    config: AppConfig;

    isLoading : any = true;


    subscription: Subscription;
    
    constructor(public configService: ConfigService,private claimServices : ClaimServiceService ) {

        
     }

     

    public fetchClaimByLastWeek(){
        this.claimServices.fetchClaimByLastWeek().subscribe(
            
            
          data => {
              
    
            this.data1 = data;
            console.log(data);
            console.log(Object.keys(this.data1));
    
            for(let i =0; i<Object.keys(this.data1).length;i++){
              this.tabxweek.push(Object.keys(this.data1)[i]);
              this.tabyweek.push(this.data1[Object.keys(this.data1).sort()[i]]);
              this.numberClaimbyweek = this.data1[Object.keys(this.data1)[i]]+this.numberClaimbyweek;
              
            }
            console.log("**** : "+this.tabxweek+ " /// : "+ this.tabyweek);

            this.lineData = {
            
                labels:this.tabxweek,
                datasets: [
                    {
                        
                        label: 'Claim number by last week',
                        data: this.tabyweek,
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: .4
                    }
                ]
            };
    
 
          }
        );
      }

      public fetchClaimByLastmounth(){
        this.claimServices.fetchClaimByLastMounth().subscribe(
          data => {
    
            this.data2 = data;
            console.log(data);
            console.log(Object.keys(this.data2));

    
            for(let i =0; i<Object.keys(this.data2).length;i++){
              this.tabxmounth.push(Object.keys(this.data2)[i]);
              this.tabymounth.push(this.data2[Object.keys(this.data2).sort()[i]]);
              this.numberClaimbyMounth = this.data2[Object.keys(this.data2)[i]]+this.numberClaimbyMounth;
            }

            this.lineData1 = {
            
                labels:this.tabxmounth,
                datasets: [
                    {
                        
                        label: 'Claim number by last week',
                        data: this.tabymounth,
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: .4
                    }
                ]
            };
 
          }
        );
      }
//aaaa
      public fetchClaimByLastyear(){
        this.claimServices.fetchClaimByLastYear().subscribe(
          data => {
    
            this.data3 = data;
            console.log(data);
            console.log(Object.keys(this.data3));
    
            for(let i =0; i<Object.keys(this.data3).length;i++){
              this.tabxyear.push(Object.keys(this.data3)[i]);
              this.tabyyear.push(this.data3[Object.keys(this.data3).sort()[i]]);
              this.numberClaimbyYear = this.data3[Object.keys(this.data3)[i]]+this.numberClaimbyYear;

            }
            
            this.lineData2 = {
            
                labels:this.tabxyear,
                datasets: [
                    {
                        
                        label: 'Claim number by last week',
                        data: this.tabyyear,
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: .4
                    }
                ]
            };
            console.log("tabyearx : "+this.tabxyear+ " tabyeary : "+ this.tabyyear);
          }
        );
        
      }

      public fetchClaimTypesByLasweek(){
        this.claimServices.fetchClaimTypeByLastWeek().subscribe(
          data => {
    
            this.data11 = data;
            console.log(data);
            console.log(Object.keys(this.data11));
    
            for(let i =0; i<Object.keys(this.data11).length;i++){
              this.tabxweek1.push(Object.keys(this.data11)[i]);
              this.tabyweek1.push(this.data11[Object.keys(this.data11).sort()[i]]);
              
            }
            
            this.pieData = {
                labels: this.tabxmounth1,
                datasets: [
                    {
                        data: this.tabyweek1,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF00B7",
                            "#FF0038",
                            "#FF4800",
                            "#FFC700",
                            "#B7FF00"
    
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF00B7",
                            "#FF0038",
                            "#FF4800",
                            "#FFC700",
                            "#B7FF00"
                        ]
                    }
                ]
            };
            console.log("tabyearx : "+this.tabxweek1+ " tabyeary : "+ this.tabyweek1);
          }
        );
      }

      public fetchClaimTypesByLastmounth(){
        this.claimServices.fetchClaimTypeByLastmounth().subscribe(
          data => {
    
            this.data22 = data;
            console.log(data);
            console.log(Object.keys(this.data22));
    
            for(let i =0; i<Object.keys(this.data22).length;i++){
              this.tabxmounth1.push(Object.keys(this.data22)[i]);
              this.tabymounth1.push(this.data22[Object.keys(this.data22).sort()[i]]);
              console.log("------tabxmounth1---------- : "+ this.tabymounth1+"------tabymounth1---------- : "+ this.tabymounth1);
              
            }
            
                   
        this.pieData1 = {
            labels: this.tabxmounth1,
            datasets: [
                {
                    data: this.tabymounth1,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF00B7",
                        "#FF0038",
                        "#FF4800",
                        "#FFC700",
                        "#B7FF00"

                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF00B7",
                        "#FF0038",
                        "#FF4800",
                        "#FFC700",
                        "#B7FF00"
                    ]
                }
            ]
        };

            console.log("tabyearx : "+this.tabxweek1+ " tabyeary : "+ this.tabyweek1);
          }
        );
      }

      public fetchClaimTypesByLastyear(){
        this.claimServices.fetchClaimTypeByLastyear().subscribe(
          data => {
    
            this.data33 = data;
            console.log(data);
            console.log(Object.keys(this.data33));
    
            for(let i =0; i<Object.keys(this.data33).length;i++){
              this.tabxyear1.push(Object.keys(this.data33)[i]);
              this.tabyyear1.push(this.data33[Object.keys(this.data33).sort()[i]]);
              
            }
            
            this.pieData2 = {
                labels: this.tabxyear1,
                datasets: [
                    {
                        data: this.tabyyear1,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF00B7",
                            "#FF0038",
                            "#FF4800",
                            "#FFC700",
                            "#B7FF00"
    
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF00B7",
                            "#FF0038",
                            "#FF4800",
                            "#FFC700",
                            "#B7FF00"
                        ]
                    }
                ]
            };
          }
        );
      }
      

    ngOnInit() {

        this.fetchClaimByLastWeek();
        this.fetchClaimByLastmounth();
        this.fetchClaimByLastyear();
        this.fetchClaimTypesByLasweek();
        this.fetchClaimTypesByLastmounth();
        this.fetchClaimTypesByLastyear();


       /* this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
*/
      
       
       


       




       




        
        this.updateChartOptions();
    }

    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    applyLightTheme() {
        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
            }
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
            }
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

    }

    applyDarkTheme() {
        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
