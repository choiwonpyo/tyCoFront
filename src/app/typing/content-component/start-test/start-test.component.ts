import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {
  @Input() right = 0 ;
  @Input() top = 0;
  @Input() testMessage = '시험을 시작합니다.';
  @Input() isTest = false;
  @Output() testStartClicked = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  testStart() {
    this.testStartClicked.emit(true);
  }
}
