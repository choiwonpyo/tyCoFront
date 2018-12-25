import {Component, Input, OnInit} from '@angular/core';
import {NormalNode, StudyNode} from '../../node-core/node';

@Component({
  selector: 'app-normal-node',
  templateUrl: './normal-node.component.html',
  styleUrls: ['./normal-node.component.css']
})
export class NormalNodeComponent implements OnInit {
  @Input() node: NormalNode;
  constructor() { }

  ngOnInit() {
  }

}
