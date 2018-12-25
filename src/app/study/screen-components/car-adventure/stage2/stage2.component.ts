import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character, ComponentsManager, Map} from "../../component";
import {StudyNodeService} from "../../../node-core/study-node.service";
import {Subscription} from "rxjs/index";
import {Stage2} from "../../stage-infos/car-adventure/stage2";

@Component({
  selector: 'app-stage2',
  templateUrl: './stage2.component.html',
  styleUrls: ['./stage2.component.css']
})
export class Stage2Component implements OnInit, OnDestroy{
  stage2: Stage2;
  character: Character;
  map: Map;
  componentManager: ComponentsManager;
  subscription: Subscription;
  resultTextVisible = false;
  result = false;
  constructor(protected nodeService: StudyNodeService) { }

  ngOnInit() {
    this.stage2 = new Stage2();
    this.map = this.stage2.map;
    this.componentManager = this.stage2.componentsManager;
    this.character = this.componentManager.getCharacter(this.stage2.characterId + '');
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
      } , 300 * index);
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
