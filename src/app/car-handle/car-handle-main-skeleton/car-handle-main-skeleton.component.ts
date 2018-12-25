import {Component, OnDestroy, OnInit} from '@angular/core';
import {Direction, ForNode, NormalNode, StudyNode} from "../../study/node-core/node";
import {DragulaService} from "ng2-dragula";
import {StudyNodeService} from "../../study/node-core/study-node.service";
import {MiddleServerConfig} from "../../common/service/middleServerConfig";

@Component({
  selector: 'app-car-handle-main-skeleton',
  templateUrl: './car-handle-main-skeleton.component.html',
  styleUrls: ['./car-handle-main-skeleton.component.css']
})
export class CarHandleMainSkeletonComponent implements OnInit, OnDestroy {
  items: StudyNode[] = [
    new NormalNode(Direction.FRONT, this.studyNodeService.globalNodeId++),
    new NormalNode(Direction.LEFT, this.studyNodeService.globalNodeId++),
    new NormalNode(Direction.RIGHT, this.studyNodeService.globalNodeId++),
    new NormalNode(Direction.BACK, this.studyNodeService.globalNodeId++),
    new ForNode(this.studyNodeService.globalNodeId++)];
  droppedItems: StudyNode[] = [];
  carStage = 1;
  puttingCommand = false;
  title = 'my-dream-app';
  constructor(private dragulaService: DragulaService, protected studyNodeService: StudyNodeService, private middleServerConfig: MiddleServerConfig) {
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
  // left 2
  // up 0
  /*
    go_front
  go_back
  turn_left
  turn_right
   */
  onPlayButtonClick() {
    if (this.puttingCommand) {
      alert('명령을 수행중입니다! 기다려주세요!');
      return false;
    }
    const inputCommand = this.droppedItems.reduce((ac, value, index, array) => ([...ac, ...value.getEvery()]), []);
    const finalInput: string = inputCommand.map((input: Direction) => {
      if (input === Direction.LEFT) {
        return 'turn_left;go_front;';
      }if (input === Direction.RIGHT) {
        return 'turn_right;go_front;';
      }if (input === Direction.FRONT) {
        return 'go_front;';
      }if (input === Direction.BACK) {
        return 'go_back;';
      }
    }).join('');
    this.puttingCommand = true;
    this.middleServerConfig.sendCommandToServer(finalInput)
      .subscribe((result) => {console.log(result); this.puttingCommand = false; }, (err: any) => {this.puttingCommand = false; });
  }
  onKeyInputClick($event) {
    if (this.puttingCommand) {
      alert('기다려주세요!');
      return false;
    }
    this.puttingCommand = true;
    const value = $event.target.value;
    $event.target.value = '';
    if (value === 'up') {
      this.middleServerConfig.sendCommandToServer('go_front;')
        .subscribe((result) => this.puttingCommand = false, (err: any) => {this.puttingCommand = false; });
    } else if(value === 'right') {
      this.middleServerConfig.sendCommandToServer('turn_right;go_front;')
        .subscribe((result) => this.puttingCommand = false, (err: any) => {this.puttingCommand = false; });
    } else if(value === 'left') {
      this.middleServerConfig.sendCommandToServer('turn_left;go_front;')
        .subscribe((result) => this.puttingCommand = false, (err: any) => {this.puttingCommand = false; });
    } else if (value === 'down') {
      this.middleServerConfig.sendCommandToServer('go_back;')
        .subscribe((result) => this.puttingCommand = false, (err: any) => {this.puttingCommand = false; });
    }
  }
}
