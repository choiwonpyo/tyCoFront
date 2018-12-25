import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-speed-wagon',
  templateUrl: './speed-wagon.component.html',
  styleUrls: ['./speed-wagon.component.css']
})
export class SpeedWagonComponent implements OnInit, OnChanges, OnDestroy{
  @Input() right = 0;
  @Input() bottom = 0;
  @Input() inputDialog = ['안녕 나는 speedWagon이야', '보시다시피 고양이입니다만.', '연습이 다 됐으면 시험을 보는건 어때?'];
  dialogIndex = 0;
  dialog = '';
  dialogLeft = 0;
  currentInterval
  constructor() {
    this.dialog = this.inputDialog[0];
    this.dialogLeft = -10 * this.inputDialog[0].length;
    this.changeDialog();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputDialog']) {
      if (this.currentInterval) {
        clearInterval(this.currentInterval);
      }
      this.changeDialog();
    }
  }
  ngOnDestroy(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
  }
  changeDialog() {
   this.currentInterval = setInterval(() => {
     this.dialogIndex = (this.dialogIndex + 1) % this.inputDialog.length;
     this.dialog = this.inputDialog[this.dialogIndex];
   }, 3000);
  }
}
