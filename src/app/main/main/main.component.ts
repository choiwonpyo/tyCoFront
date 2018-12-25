import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from "../../common/service/AppService";
import {ActivatedRoute, Router} from "@angular/router";
import {MiddleServerConfig} from "../../common/service/middleServerConfig";
import {UserInformationService} from "../../common/service/userInformationService";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{

  userInformation: any;
  subscription: Subscription;
  constructor(private appService: AppService,  private _router: Router, private route: ActivatedRoute,
              private middleServerConfig: MiddleServerConfig, private userInformationService: UserInformationService) {
  }

  ngOnInit() {
    this.subscription = this.userInformationService.userInformation.subscribe((data) => {
      if (data) {
        this.userInformation = data;
        const sample = data.typingStepUserStudy
          .map((d: any) => {
              if (d) {
                return d.typingStep.stepScore;
              }
              return 0;
            }
          )
        this.userInformation.typingScore  = sample.length > 0 ? sample.reduce((ac, value) => ac + value) : 0;
      }

    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  logout() {
    this.appService.logout();
  }
  toMain() {
    this._router.navigate(['/main']);
  }
}
