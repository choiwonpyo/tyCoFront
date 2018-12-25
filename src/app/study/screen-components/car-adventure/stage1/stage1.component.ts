import {Component, OnDestroy, OnInit} from '@angular/core';
import {Stage1} from "../../stage-infos/car-adventure/stage1";
import {Character, ComponentsManager, Map} from "../../component";
import {StudyNodeService} from "../../../node-core/study-node.service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-stage1',
  templateUrl: './stage1.component.html',
  styleUrls: ['./stage1.component.css']
})
export class Stage1Component implements OnInit, OnDestroy {
  stage1: Stage1;
  character: Character;
  map: Map;
  componentManager: ComponentsManager;
  subscription: Subscription;
  resultTextVisible = false;
  result = false;
  constructor(protected nodeService: StudyNodeService) { }

  ngOnInit() {
    this.stage1 = new Stage1();
    this.map = this.stage1.map;
    this.componentManager = this.stage1.componentsManager;
    this.character = this.componentManager.getCharacter(this.stage1.characterId + '');
    this.nodeService.actions.next([]);
    this.subscription = this.nodeService.actions.subscribe((value: any) => this.actionBehavior(value));
  }
  actionBehavior(value: any[]) {
    value.forEach((d, index, array) => {
      setTimeout(() => {
        const changed = this.map.changeComponentPosition(this.character.id + '',
          this.nodeService.getXChange(d, this.character.width),
          this.nodeService.getYChange(d, this.character.height)); // move X by 'Character's Width' and move Y by 'Character's Height'
        if (changed) {
          this.map.setMapInfoAll(); // if changed. set All map Info
        }
        if (index === array.length - 1) {// if action is End
          setTimeout(() => {
            this.resultTextVisible = true;
            if (this.isStageCleared()) {
              this.result = true;
            } else {
              this.result = false;
              this.map.loadFirstComponentPosition();
              this.map.setMapInfoAll();
              setTimeout(() => {this.resultTextVisible = false; }, 500);
            }
          }, 1000);
        }
      } , 500 * index);
    });
  }
  isStageCleared(): boolean {
    if (this.componentManager.goal) {
      return true;
    } else {
      return false;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
