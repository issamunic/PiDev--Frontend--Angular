
import { UserService } from '../services/user/user.service';
import { _YAxis } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  data: any;

  chartOptions: any;

  subscription: Subscription;

  config: AppConfig;

  nameRoleList = [];
  numberOfUserForRole = [];

  constructor(private userService: UserService, public configService: ConfigService) { }

  ngOnInit(): void {
    this.statRole();


    this.config = this.configService.config;
    this.updateChartOptions();
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
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

}
