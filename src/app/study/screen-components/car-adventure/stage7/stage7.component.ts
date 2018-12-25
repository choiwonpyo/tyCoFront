import {Stage7} from "../../stage-infos/car-adventure/stage7";
import {Subscription} from "rxjs/index"
import {StudyNodeService} from "../../../node-core/study-node.service";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character, ComponentsManager, Map} from "../../component";

@Component({
  selector: 'app-stage7',
  templateUrl: './stage7.component.html',
  styleUrls: ['./stage7.component.css']
})
export class Stage7Component implements OnInit, OnDestroy {

  stage7: Stage7;
  character: Character;
  map: Map;
  componentManager: ComponentsManager;
  subscription: Subscription;
  resultTextVisible = false;
  result = false;
  constructor(protected nodeService: StudyNodeService) { }

  ngOnInit() {
    this.stage7 = new Stage7();
    this.map = this.stage7.map;
    this.componentManager = this.stage7.componentsManager;
    this.character = this.componentManager.getCharacter(this.stage7.characterId + '');
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
    if (this.componentManager.goal && this.componentManager.catchCount >= this.componentManager.catchGoal) {
      return true;
    } else {
      return false;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
