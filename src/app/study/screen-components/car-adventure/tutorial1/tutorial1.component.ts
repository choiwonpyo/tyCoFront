import {TutorialStage1} from "../../stage-infos/car-adventure/tutorial1";
import {Subscription} from "rxjs/index";
import {StudyNodeService} from "../../../node-core/study-node.service";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character, ComponentsManager, Map} from "../../component";
@Component({
  selector: 'app-tutorial1',
  templateUrl: './tutorial1.component.html',
  styleUrls: ['./tutorial1.component.css']
})
export class Tutorial1Component implements OnInit, OnDestroy {
  tutorial1: TutorialStage1;
  character: Character;
  map: Map;
  componentManager: ComponentsManager;
  subscription: Subscription;
  resultTextVisible = false;
  result = false;
  constructor(protected nodeService: StudyNodeService) { }

  ngOnInit() {
    this.tutorial1 = new TutorialStage1();
    this.map = this.tutorial1.map;
    this.componentManager = this.tutorial1.componentsManager;
    this.character = this.componentManager.getCharacter(this.tutorial1.characterId + '');
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
