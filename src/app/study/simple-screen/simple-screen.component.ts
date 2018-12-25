import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudyNodeService} from "../node-core/study-node.service";

@Component({
  selector: 'app-simple-screen',
  templateUrl: './simple-screen.component.html',
  styleUrls: ['./simple-screen.component.css']
})
export class SimpleScreenComponent implements OnInit {
  @ViewChild('car') carImage: ElementRef;
  subscription = null;
  constructor(protected nodeService: StudyNodeService) { }

  ngOnInit() {
    console.log(this.carImage);
    this.carImage.nativeElement.style.left = '200px';
    this.subscription = this.nodeService.actions.subscribe((values) => {
      console.log(values);
    });
  }
}
