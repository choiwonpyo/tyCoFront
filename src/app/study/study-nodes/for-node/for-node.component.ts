import {Component, Input, OnInit} from '@angular/core';
import {ForNode, NodeType, NormalNode, StudyNode} from '../../node-core/node';
import {StudyNodeService} from '../../node-core/study-node.service';
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-for-node',
  templateUrl: './for-node.component.html',
  styleUrls: ['./for-node.component.css']
})
export class ForNodeComponent implements OnInit {
  @Input() forNode: ForNode;
  @Input() canContain: boolean;
  groupId: string;
  constructor(private dragulaService: DragulaService, protected studyNodeService: StudyNodeService) {
    this.groupId = 'FOR_NODE' + this.studyNodeService.globalForNode++;
  }
  ngOnInit() {
  }
}
