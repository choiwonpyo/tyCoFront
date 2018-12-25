import {Injectable} from '@angular/core';
import * as baseData from '../content/baseData';
import {TyCoStudyService} from "../../common/service/tyCoStudyService";
import {UserInformationService} from "../../common/service/userInformationService";

@Injectable()
export class ContentSettingService {
  testTimeLimit: any = {1: 3, 2: 3, 3: 5};
  testOptions: any = {totalProblemCount: 2, failCount : 2};
  successPercentage;
  currentInputContent = '';
  currentInputContentDesc = '';
  inputContent = baseData.baseAlphabet;
  successCount = 0;
  falseCount = 0;
  beforeSuccessTime = 0;
  problemCount = 0;
  isTest = false;
  timeLimit = 4;
  step = 1;
  currentInputPassedSecond = 0;
  averageSecond = 0;
  currentInputStartTime = new Date();
  currentInputInterval;
  keyboardStyle = {backgroundColor: 'rgb(255,255,255'};
  testMessage = '';
  falseSound = new Audio('assets/music/false_sound.wav');
  successSound = new Audio('assets/music/tick.mp3');
  subject = 'BASE';

  constructor(private tycoStudyService: TyCoStudyService, private userInformationService: UserInformationService) {}
  buildNewContentSetting(setting: ContentSetting) {
    this.testTimeLimit = setting.testTimeLimit;
    this.testOptions = setting.testOptions;
    this.timeLimit = setting.timeLimit;
    this.step = 1;
    this.subject = setting.subject;
  }
  startInputSystem() {
    this.destroyInterval();
    this.currentInputStartTime = new Date();
    this.currentInputInterval = setInterval(() => {
      this.currentInputPassedSecond = (new Date().getTime() - this.currentInputStartTime.getTime()) / 1000;
      this.otherAttributeSetting();
      if (this.currentInputPassedSecond > this.timeLimit) {
        this.playFailSound();
        if (this.isTest) {
          this.checkTestEnd();
        }
        this.falseCount = this.falseCount + 1;
        this.currentInputStartTime = new Date();
        this.contentSetting();
      }
    }, 100);
  }
  contentSetting() {
    const index = this.getRandomContentIndex();
    this.currentInputContent = this.inputContent[index].word;
    this.currentInputContentDesc = this.inputContent[index].desc;
    this.problemCount += 1;
  }
  getRandomContentIndex(): number {
    const length = this.inputContent.length;
    const index = Math.floor((new Date().getTime())  % length);
    return index;
  }

  percentageSetting() {
    if (this.successCount !== 0 || this.falseCount !== 0) {
      this.successPercentage = Math.floor((this.successCount / (this.successCount + this.falseCount)) * 100);
    }
  }
  testStart() {
    this.resetStartInformation();
    this.isTest = true;
    this.timeLimit = this.testTimeLimit[this.step];
  }
  checkTestEnd() {
    if (this.successCount + this.falseCount >= this.testOptions.totalProblemCount) {
      this.testEnd();
    }
    if (this.falseCount >= this.testOptions.failCount) {
      this.testEnd();
    }
  }
  testEnd() {
    this.destroyInterval();
    this.isTest = false;
    if (this.falseCount >= this.testOptions.failCount) {
      alert('실패');
    } else {
      this.tycoStudyService.clearTypingStage(this.subject, this.step)
        .subscribe((data) => {this.userInformationService.refreshUserInformationFromServer()}, (error: any) => { console.log(error)});
      alert('성공');
    }
    this.resetStartInformation();
  }

  resetStartInformation() {
    this.problemCount = 0;
    this.successCount = 0;
    this.falseCount = 0;
    this.beforeSuccessTime = 0;
    this.averageSecond = 0;
    this.percentageSetting();
    this.currentInputStartTime = new Date();
  }
  successHandler() {
    this.beforeSuccessTime = this.currentInputPassedSecond;
    this.successCount = this.successCount + 1;
    this.averageSecond = ((this.averageSecond * (this.successCount - 1)) + this.beforeSuccessTime) / this.successCount;
  }
  otherAttributeSetting() {
    this.percentageSetting();
    this.keyboardStyleSetting();
  }

  keyboardStyleSetting() {
    const colorChangeAmount = 255 / this.timeLimit;
    const color = 255 - colorChangeAmount * this.currentInputPassedSecond;
    this.keyboardStyle = {backgroundColor: `rgb(${color},${color},${color}`};
  }

  changeTestMessage() {
    const limit = this.testTimeLimit[this.step];
    this.testMessage = `단계는 ${this.step} 단계! 각 단어의 제한시간은 ${limit}초입니다!
     ${this.testOptions.totalProblemCount}개 중 ${this.testOptions.failCount}개 이상을 맞춰야 해요!`;
  }
  playFailSound() {
    if (this.falseSound.paused) {
      this.falseSound.play();
    } else {
      this.falseSound.pause();
    }
  }
  playSuccessSound() {
    if (this.successSound.paused) {
      this.successSound.play();
    } else {
      this.successSound.pause();
    }
  }
  falseCountUp() {
    this.falseCount = this.falseCount + 1;
  }
  successCountUp() {
    this.successCount = this.successCount + 1;
  }
  speedUp() {
    if (this.timeLimit - 1 >= 1) {
      this.timeLimit = this.timeLimit - 1;
    }
  }
  speedDown() {
    if (this.timeLimit + 1 <= 15) {
      this.timeLimit = this.timeLimit +  1;
    }
  }
  startStep(step, inputContent: any) {
    this.inputContent = inputContent;
    this.step = step;
    this.resetStartInformation();
    this.contentSetting();
    this.startInputSystem();
    this.changeTestMessage();
  }
  destroyInterval() {
    if (this.currentInputInterval) {
      clearInterval(this.currentInputInterval);
    }
  }
  beforeStepCleared(beforeStep: number, userInformation: any): boolean {
    if (!userInformation) {
      return false;
    }
    console.log(userInformation.typingStepUserStudy);
    if (userInformation.typingStepUserStudy && userInformation.typingStepUserStudy.length !== 0) {
      console.log('check');
      const beforeData = userInformation.typingStepUserStudy.filter((data) => {
        if (data.typingStep) {
          if (data.typingStep.step === beforeStep && data.typingStep.subject === this.subject) {
            return true;
          }
        }
        return false;
      });
      if (beforeData && beforeData.length >= 1) {
        return true;
      }
    }
    return false;
  }
}
export interface ContentSetting {
  step: number;
  testTimeLimit: any;
  testOptions: {totalProblemCount: number, failCount: number};
  isTest: boolean;
  timeLimit: number;
  subject: string;
}
