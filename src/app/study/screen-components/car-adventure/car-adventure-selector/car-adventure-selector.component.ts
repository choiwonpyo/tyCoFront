import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-car-adventure-selector',
  templateUrl: './car-adventure-selector.component.html',
  styleUrls: ['./car-adventure-selector.component.css']
})
export class CarAdventureSelectorComponent implements OnInit {
  @Output() stage: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  stageClick(value: number) {
    this.stage.emit(value);
  }
}
