import {Component, OnDestroy, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {Direction, NormalNode, StudyNode, NodeType, ForNode} from '../node-core/node';
import {StudyNodeService} from '../node-core/study-node.service';

@Component({
  selector: 'app-main-skeleton',
  templateUrl: './main-skeleton.component.html',
  styleUrls: ['./main-skeleton.component.css']
})
export class MainSkeletonComponent implements OnInit, OnDestroy{
  items: StudyNode[] = [
    new NormalNode(Direction.FRONT, this.studyNodeService.globalNodeId++),
    new NormalNode(Direction.LEFT, this.studyNodeService.globalNodeId++),
    new NormalNode(Direction.RIGHT, this.studyNodeService.globalNodeId++),
    new NormalNode(Direction.BACK, this.studyNodeService.globalNodeId++),
    new ForNode(this.studyNodeService.globalNodeId++)];
  droppedItems: StudyNode[] = [];
  carStage = 1;
  title = 'my-dream-app';
  constructor(private dragulaService: DragulaService, protected studyNodeService: StudyNodeService) {
    dragulaService.createGroup('VAMPIRES', {
      removeOnSpill: true,
      copy: (el, source) => { return source.id === 'commandList'},
      copyItem: (item: StudyNode) => {
        console.log(this.droppedItems);
        if (item.getType() === this.studyNodeService.normalType) {
          return new NormalNode(item.getEvery()[0], this.studyNodeService.globalNodeId++);
        } else if (item.getType() === this.studyNodeService.forType) {
          return new ForNode(this.studyNodeService.globalNodeId++);
        }
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'commandList';
      }
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.dragulaService.destroy('VAMPIRES');
  }
  carStageSelected(value: any) {
    console.log(value);
    this.carStage = value;
  }
  onPlayButtonClick() {
    this.studyNodeService.actions.next(this.droppedItems.reduce((ac, value, index, array) => ([...ac, ...value.getEvery()]), []));
  }


}
