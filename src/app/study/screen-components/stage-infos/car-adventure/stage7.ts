import {StageCore} from '../stageCore';
import {Block, Character, Components, ComponentsManager, Goal, Item, Map} from '../../component';

const blockWidth = 50;
const blockHeight = 30;
const mapWidth = 350;
const mapHeight = 300;
const blockXYInfo = [
  {x: 0, y: 0},{x: blockWidth, y: 0},{x: blockWidth*2, y: 0},{x: blockWidth*4, y: 0},{x: blockWidth*5, y: 0},{x: blockWidth*6, y: 0},

  {x: 0, y: blockHeight}, {x: blockWidth, y: blockHeight},{x: blockWidth*5, y: blockHeight},{x: blockWidth*6, y: blockHeight},

  {x: 0, y: blockHeight*2}, {x: blockWidth*3, y: blockHeight*2},{x: blockWidth*6, y: blockHeight*2},

  {x: blockWidth*2, y: blockHeight*3}, {x: blockWidth*3, y: blockHeight*3},{x: blockWidth*4, y: blockHeight*3},

  {x: blockWidth, y: blockHeight*5},{x: blockWidth*2, y: blockHeight*5},{x: blockWidth*3, y: blockHeight*5},
  {x: blockWidth*4, y: blockHeight*5},{x: blockWidth*5, y: blockHeight*5},

  {x: blockWidth*2, y: blockHeight*6}, {x: blockWidth*3, y: blockHeight*6},{x: blockWidth*4, y: blockHeight*6},

  {x: 0, y: blockHeight*7},{x: blockWidth, y: blockHeight*7},{x: blockWidth*5, y: blockHeight*7},{x: blockWidth*6, y: blockHeight*7},

  {x: 0, y: blockHeight*8}, {x: blockWidth*3, y: blockHeight*8},{x: blockWidth*6, y: blockHeight*8},

  {x: 0, y: blockHeight*9},{x: blockWidth, y: blockHeight*9},{x: blockWidth*2, y: blockHeight*9},
  {x: blockWidth*4, y: blockHeight*9},{x: blockWidth*5, y: blockHeight*9},{x: blockWidth*6, y: blockHeight*9},

];
export class Stage7 extends StageCore {
  constructor() {
    const componentManager = new ComponentsManager();
    const map = new Map(0, 0, mapWidth, mapHeight, componentManager);
    super(map, componentManager);
    blockXYInfo.forEach((value) => {
      this.map.setObstacles(new Block(value.x, value.y, blockWidth, blockHeight, 'assets/depender.png'));
    });
    this.characterId = this.map.setCharacter(new Character(blockWidth * 3, 0, blockWidth, blockHeight, 'assets/fish_ship.png'));
    this.map.setObstacles(new Item(blockWidth, blockHeight * 6, blockWidth, blockHeight, 'assets/fish1.png'));
    this.map.setObstacles(new Item(blockWidth * 5, blockHeight * 6, blockWidth, blockHeight, 'assets/fish3.png'));
    this.map.setObstacles(new Goal(blockWidth * 3, blockHeight * 4 , blockWidth, blockHeight, 'assets/light_house.png'));
    this.componentsManager.catchGoal = 2;
    this.map.setMapInfoAll();
    this.map.saveFirstComponentPosition(); // you should save First Component's Position to rollback everything.
  }
}
