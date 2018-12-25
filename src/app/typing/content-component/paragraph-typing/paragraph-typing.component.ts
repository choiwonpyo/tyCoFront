import {Component, OnDestroy, OnInit} from '@angular/core';
import * as baseData from '../../content/baseData';
import {ContentSetting, ContentSettingService} from "../../content-service/content-setting.service";
import {Subscription} from "rxjs/index";
import {UserInformationService} from "../../../common/service/userInformationService";
@Component({
  selector: 'app-paragraph-typing',
  templateUrl: './paragraph-typing.component.html',
  styleUrls: ['./paragraph-typing.component.css']
})
export class ParagraphTypingComponent implements OnInit, OnDestroy {
  contentExample = [];
  information = [];
  wordTypingOption: ContentSetting = {timeLimit: 10, isTest: false,
    testOptions: {totalProblemCount: 10, failCount: 5}, step: 1,
    testTimeLimit:  {1: 10, 2: 10, 3: 10}, subject: 'PARAGRAPH'};
  twoStepAvailable = false;
  threeStepAvailable = false;
  subscription: Subscription;
  userInformation;
  constructor(public contentService: ContentSettingService, private userInformationService: UserInformationService) {
    this.contentService.destroyInterval();
    this.contentService.buildNewContentSetting(this.wordTypingOption);
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
    this.information = ['이제 문장을 연습해보자', '문자을 따라 쓰고 Enter를 눌러봐', '띄워쓰기에 주의해.'];
    this.contentService.startStep(1, baseData.baseParagraph);
  }
  twoStepClicked(test?) {
    this.information = ['이번엔 조금 더 어려운 문장을 연습해보자', '조금 어려우면 시간을 늦춰도 좋아.'];
    this.contentService.startStep(2, baseData.secondParagraph);
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
  }
}

