import {StageCore} from '../stageCore';
import {Block, Character, Components, ComponentsManager, Goal, Item, Map} from '../../component';

const blockWidth = 50;
const blockHeight = 30;
const mapWidth = 350;
const mapHeight = 150;
const blockXYInfo = [{x: 0, y: 0},{x: blockWidth, y: 0},{x: blockWidth*2, y: 0},{x: blockWidth*3, y: 0},
  {x: blockWidth*4, y: 0},{x: blockWidth*5, y: 0},{x: blockWidth*6, y: 0},
  {x: 0, y: blockHeight}, {x: blockWidth*4, y: blockHeight},{x: blockWidth*5, y: blockHeight},{x: blockWidth*6, y: blockHeight},

  {x: 0, y: blockHeight*2}, {x: blockWidth, y: blockHeight*2},{x: blockWidth*2, y: blockHeight*2},
  {x: blockWidth*4, y: blockHeight*2},{x: blockWidth*5, y: blockHeight*2},{x: blockWidth*6, y: blockHeight*2},

  {x: 0, y: blockHeight*3}, {x: blockWidth, y: blockHeight*3}, {x: blockWidth*2, y: blockHeight*3},{x: blockWidth*6, y: blockHeight*3},

  {x: 0, y: blockHeight*4},{x: blockWidth, y: blockHeight*4},{x: blockWidth*2, y: blockHeight*4},{x: blockWidth*3, y: blockHeight*4},
  {x: blockWidth*4, y: blockHeight*4},{x: blockWidth*5, y: blockHeight*4},{x: blockWidth*6, y: blockHeight*4}];

export class TutorialStage1 extends StageCore {
  constructor() {
    const componentManager = new ComponentsManager();
    const map = new Map(0, 0, mapWidth, mapHeight, componentManager);
    super(map, componentManager);
    blockXYInfo.forEach((value) => {
      this.map.setObstacles(new Block(value.x, value.y, blockWidth, blockHeight, 'assets/depender.png'));
    });
    this.map.setObstacles(new Goal(blockWidth * 5, blockHeight * 3, blockWidth, blockHeight, 'assets/light_house.png'));
    this.characterId = this.map.setCharacter(new Character(blockWidth, blockHeight * 1, blockWidth, blockHeight, 'assets/fish_ship.png'));
    this.map.setMapInfoAll();
    this.map.saveFirstComponentPosition(); // you should save First Component's Position to rollback everything.
    this.map.goalEventOccur.subscribe((goalEvent: any) => {goalEvent ? this._componentManager.goal = true : this._componentManager.goal = false;});
    this.map.catchEventOccur.subscribe((catchEvent: any) => {if (catchEvent) {this._componentManager.catchCount++; }});
  }
}
