import {Component, OnDestroy, OnInit} from '@angular/core';
import * as baseData from '../../content/baseData';
import {ContentSetting, ContentSettingService} from '../../content-service/content-setting.service';
import {UserInformationService} from "../../../common/service/userInformationService";
import {Subscription} from "rxjs/index";
@Component({
  selector: 'app-base-typing',
  templateUrl: './base-typing.component.html',
  styleUrls: ['./base-typing.component.css']
})
export class BaseTypingComponent implements OnInit, OnDestroy {
  contentExample = [];
  information = [];
  userInformation;
  subscription: Subscription;
  twoStepAvailable = false;
  threeStepAvailable = false;
  baseTypingOptions: ContentSetting = {timeLimit: 4, isTest: false,
    testOptions: {totalProblemCount: 10, failCount: 5}, step: 1,
    testTimeLimit:  {1: 3, 2: 3, 3: 5}, subject: 'BASE'};
  constructor(public contentService: ContentSettingService, private userInformationService: UserInformationService) {
    this.contentService.destroyInterval();
    this.contentService.buildNewContentSetting(this.baseTypingOptions);
    this.oneStepClicked();
    this.subscription = this.userInformationService.userInformation.subscribe((d: any) => {this.userInformation = d
      if (this.contentService.beforeStepCleared(1, this.userInformation)) {
        this.twoStepAvailable = true;
      }
      if (this.contentService.beforeStepCleared(2, this.userInformation)) {
        this.threeStepAvailable = true;
      }
    });
  }

  ngOnInit() {
  }
  readEnter(event) {
    if (event.target.value === '') {
      return true;
    }
    this.contentExample.push(event.target.value);
    this.checkEnter(event.target.value);
    this.contentExample = this.contentExample.filter((value, index, array) => {
      if (array.length - 5 > index) {
        return false;
      }
      return true;
    })
    event.target.value = '';
    if (this.contentService.isTest) {
      this.contentService.checkTestEnd();
    }
  }
  checkEnter(enterInput) {
    if (enterInput === this.contentService.currentInputContent) {
      this.contentService.playSuccessSound();
      this.contentService.successHandler()
      this.contentService.contentSetting();
      this.contentService.startInputSystem();
    } else {
      this.contentService.playFailSound();
      this.contentService.falseCountUp();
    }
  }
  speedChange(type) {
    if (type === 'up') {
      this.contentService.speedUp();
    } else {
      this.contentService.speedDown();
    }
  }
  oneStepClicked(test?) {
    this.information = ['기본적인 타자를 연습할거야', '천천히 연습해보도록 해', '영타를 입력하고 싶으면 [한/영] 키를 눌러 봐'];
    this.contentService.startStep(1, baseData.baseAlphabet);
  }
  twoStepClicked(test?) {
    this.information = ['이번엔 shift 와 함께 입력해보자', '천천히 연습해보도록 해'];
    this.contentService.startStep(2, baseData.baseAlphabetUpper);
  }
  threeStepClicked(test?) {
    this.information = ['이제 소문자와 대문자가 모두 나올거야', '어쩔 땐 shift를 눌러야 하고, 어쩔 땐 누르면 안돼!'];
    this.contentService.startStep(3, baseData.baseAlphabetLowerUpper);
  }
  pausePractice() {
    this.contentService.destroyInterval();
  }
  reStart() {
    if (this.contentService.step === 1) {
      this.oneStepClicked();
    } else if (this.contentService.step === 2) {
      this.twoStepClicked();
    } else if (this.contentService.step === 3) {
      this.threeStepClicked();
    }
  }
  ngOnDestroy(): void {
    this.contentService.destroyInterval();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
