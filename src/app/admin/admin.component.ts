
import { UserService } from '../services/user/user.service';
import { _YAxis } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  data: any;//role
  data2: any;//domain
  data3: any;//radar

  chartOptions: any;
  chartOptions_radar: any;//radar

  subscription: Subscription;

  config: AppConfig;

  nameRoleList = [];
  numberOfUserForRole = [];

  dataNumberOfDomain = [];
  nameOFDomain = [];
  colorsDomain = [];

  constructor(private userService: UserService, public configService: ConfigService) { }

  async ngOnInit() {
    this.statRole();//stat role
    await this.diagramDomain();//stat domain
    this.forRadar();

    //forRoleAndDomain
    this.config = this.configService.config;
    this.updateChartOptions();
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
    });


    //forRadar
    this.config = this.configService.config;
    this.updateChartOptions_Radar();
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions_Radar();
    });
  }

  statRole() {
    this.userService.numberOfUsersWithRole().subscribe((res: any) => {
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        this.nameRoleList.push(res[i]['role']);
        this.numberOfUserForRole.push(res[i]['numberOfUser']);
      }
      this.data = {
        labels: this.nameRoleList,
        datasets: [
          {
            data: this.numberOfUserForRole,
            backgroundColor: [
              "#42A5F5",
              "#66BB6A",
              "#FFA726"
            ],
            hoverBackgroundColor: [
              "#64B5F6",
              "#81C784",
              "#FFB74D"
            ]
          }
        ]
      };
    });
  }

  async diagramDomain() {
    let listColor = ["#FFA726", "#26C6DA", "#7E57C2", "#42A5F5", "#66BB6A", "#008080", "#C0C0C0"];
    let res: any = await lastValueFrom(this.userService.numberOfUsersWithDomain());
    for (let i = 0; i < res.length; i++) {
      this.nameOFDomain.push(res[i]['name']);
      this.dataNumberOfDomain.push(res[i]['numberOfUser']);
      this.colorsDomain.push(listColor[i]);
      console.log(this.colorsDomain);
    }

    this.data2 = {
      datasets: [{
        data: this.dataNumberOfDomain,
        backgroundColor: this.colorsDomain,
        label: 'My dataset'
      }],
      labels: this.nameOFDomain
    };
    console.log(this.data2);
  }

  updateChartOptions() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
  }

  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    }
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      }
    }
  }


  forRadar() {
    this.data3 = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };
  }

  //forRadar
  updateChartOptions_Radar() {
    this.chartOptions_radar = this.config && this.config.dark ? this.getDarkTheme_Radar() : this.getLightTheme_Radar();
  }
  //forRadar
  getLightTheme_Radar() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        r: {
          pointLabels: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
          angleLines: {
            color: '#ebedef'
          }
        }
      }
    }
  }
  //forRadar
  getDarkTheme_Radar() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        r: {
          pointLabels: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
          angleLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      }
    }
  }


}
