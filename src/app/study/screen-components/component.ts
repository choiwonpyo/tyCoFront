import {BehaviorSubject} from "rxjs/index";

export abstract class Components {
  _x: number;
  _y: number;
  _zIndex: number;
  _width: number;
  _height: number;
  _moveAble: boolean;
  _stepAble: boolean;
  _catchAble: boolean;
  _type: ComponentsType;
  _id: number;
  constructor(x, y, width, height) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._zIndex = 0;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get x(): number {
    return this._x;
  }
  set x(value: number) {
    this._x = value;
  }
  get y(): number {
    return this._y;
  }
  set y(value: number) {
    this._y = value;
  }
  get width(): number {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
  }
  get height(): number {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
  }
  get moveAble() {
    return this._moveAble;
  }
  get catchAble() {
    return this._catchAble;
  }
  set moveAble(value: boolean) {
    this._moveAble = value;
  }
  set catchAble(value: boolean) {
    this._catchAble = value;
  }
  get stepAble() {
    return this._stepAble;
  }
  set stepAble(value: boolean) {
    this._stepAble = value;
  }
  get zIndex(): number {
    return this._zIndex;
  }
  set zIndex(value: number) {
    this._zIndex = value;
  }
  set type(value: ComponentsType) {
    this._type = value;
  }
  get type() {
    return this._type;
  }
  getWidthPx(): string {
    return this._width + 'px';
  }
  getHeightPx(): string {
    return this._height + 'px';
  }
}
export class Block extends Components {
  _imgSrc: string;
  constructor(x, y, width, height, imgSrc) {
    super(x, y, width, height);
    this.stepAble = false;
    this.moveAble = false;
    this.catchAble = false;
    this.type = ComponentsType.Block;
    this.zIndex = 300;
    this._imgSrc = imgSrc;
  }
  set imgSrc(value: string) {
    this._imgSrc = value;
  }
  get imgSrc() {
    return this._imgSrc;
  }
}

export class Character extends Components {
  _imgSrc: string;
  constructor(x, y, width, height, img) {
    super(x, y, width, height);
    this.stepAble = false;
    this.moveAble = true;
    this.catchAble = false;
    this._imgSrc = img;
    this.type = ComponentsType.Character;
    this.zIndex = 999;
  }
  get imgSrc(): string {
    return this._imgSrc;
  }
}
export class Item extends Components {
  _imgSrc: string;
  constructor(x, y, width, height, imgSrc) {
    super(x, y, width, height);
    this.stepAble = true;
    this.moveAble = false;
    this.catchAble = true;
    this.type = ComponentsType.Item;
    this.zIndex = 300;
    this._imgSrc = imgSrc;
  }
  set imgSrc(value: string) {
    this._imgSrc = value;
  }
  get imgSrc() {
    return this._imgSrc;
  }
}
export class Goal extends  Components {
  _imgSrc: string;
  constructor(x, y, width, height, imgSrc) {
    super(x, y, width, height);
    this.stepAble = true;
    this.moveAble = false;
    this.catchAble = true;
    this.type = ComponentsType.Goal;
    this.zIndex = 300;
    this._imgSrc = imgSrc;
  }
  set imgSrc(value: string) {
    this._imgSrc = value;
  }
  get imgSrc() {
    return this._imgSrc;
  }
}
export enum ComponentsType {
  Character = 'Character',
  Obstacle = 'Obstacle',
  Block = 'Block',
  Item = 'Item',
  Goal = 'Goal'
}
export class ComponentsManager  {
  _createdObject = {};
  _idSequence: number;
  _obstacleComponent = {};
  _characterComponent = {};
  _firstComponentsPosition = {};
  _goal = false;
  _catchCount = 0;
  _catchGoal = 0;
  constructor() {
    this._idSequence = 0;
  }
  public setAllInfoToMap(array: Array<Array<number>>) {
   let keys = Object.keys(this._obstacleComponent);
   keys.forEach((cId: string) => {
     this.setInfoToMap(cId, this._obstacleComponent, array);
   });
   keys = Object.keys(this._characterComponent);
   keys.forEach((cId: any) => {
     this.setInfoToMap(cId, this._characterComponent, array);
   });
  }
  private setInfoToMap(cId: string, containedAt: any, mapInfo: Array<Array<number>>) {
    const c = containedAt[cId];
    for (let i = c.y; i < c.y + c.height; i++) {
      for (let j = c.x; j < c.x + c.width; j++) {
        mapInfo[i][j] = c.id;
      }
    }
  }
  public setComponent(c: Components, type: ComponentsType): number {
    if (Object.keys(this._createdObject).indexOf(c.id + '', 0) === -1) {
      c.id = this._idSequence++;
      this._createdObject[c.id] = c;
    }
    if (type === ComponentsType.Character && Object.keys(this._characterComponent).indexOf(c.id + '', 0) === -1) {
      this._characterComponent[c.id] = c;
    } else if (type === ComponentsType.Obstacle && Object.keys(this._obstacleComponent).indexOf(c.id + '', 0) === -1) {
     this._obstacleComponent[c.id] = c;
    }
    return c.id;
  }
  public hideComponent(c: Components) {
    if (Object.keys(this._characterComponent).indexOf(c.id + '', 0) !== -1) {
      delete this._characterComponent[c.id];
    } else if (Object.keys(this._obstacleComponent).indexOf(c.id + '', 0) !== -1) {
      delete this._obstacleComponent[c.id];
    }
  }
  public removeComponent(c: Components) {
    this.hideComponent(c);
    if (Object.keys(this._createdObject).indexOf(c.id + '', 0) !== -1) {
      delete this._createdObject[c.id];
    }
  }
  public getCharacter(cId: string): Character {
    return this._characterComponent[cId];
  }
  public getObstacle(cId: string): Components {
    return this._obstacleComponent[cId];
  }
  public getAllObstacle(): Components[] {
    const keys = Object.keys(this._obstacleComponent);
    return keys.map((c) => this._obstacleComponent[c]);
  }
  public getComponent(cId: string): Components {
    return this.getCharacter(cId) ? this.getCharacter(cId) : this.getObstacle(cId);
  }
  public saveFirstComponentPosition() {
    const keys = Object.keys(this._createdObject);
    keys.forEach((k) => {
      this._firstComponentsPosition[k] = {x: this._createdObject[k].x, y: this._createdObject[k].y};
    });
  }
  public loadFirstComponentPosition() {
    const keys = Object.keys(this._firstComponentsPosition);
    keys.forEach((k: string) => {
      this._createdObject[k].x = this._firstComponentsPosition[k].x;
      this._createdObject[k].y = this._firstComponentsPosition[k].y;
      if (Object.keys(this._obstacleComponent).indexOf(k) === -1 &&  Object.keys(this._characterComponent).indexOf(k)) {
        this._obstacleComponent[k] = this._createdObject[k];
      }
    });
    this.catchCount = 0;
    this.goal = false;
  }
  get goal() {
    return this._goal;
  }
  set goal(value: boolean) {
    this._goal = value;
  }
  get catchCount() {
    return this._catchCount;
  }
  set catchCount(value: number) {
    this._catchCount = value;
  }
  get catchGoal() {
    return this._catchGoal;
  }
  set catchGoal(value: number) {
    this._catchGoal = value;
  }
}
export class Map extends Components {
  _backgroundColor: string;
  _stepAbleP;
  _componentManager: ComponentsManager;
  catchEventOccur: BehaviorSubject<boolean> = new BehaviorSubject(null);
  goalEventOccur: BehaviorSubject<boolean> = new BehaviorSubject(null);
  constructor(x, y, width, height, componentManager: ComponentsManager) {
    super(x, y, width, height);
    this._zIndex = 0;
    this._stepAbleP = new Array(this.height + 1);
    this._componentManager = componentManager;
    for (let i = 0; i < this.height + 1; i++) {
      this._stepAbleP[i] = new Array(this.width + 1);
    }
    console.log(this._stepAbleP);
    // all to value false
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this._stepAbleP[i][j] = -1;
      }
    }
  }
  get backGroundColor() {
    return this._backgroundColor;
  }
  set backGroundColor(value: string) {
    this._backgroundColor = value;
  }
  clearInfoAll() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this._stepAbleP[i][j] = -1;
      }
    }
  }
  setObstacles(component: Components): number {
    return this._componentManager.setComponent(component, ComponentsType.Obstacle);
  }
  setCharacter(component: Character): number {
    return this._componentManager.setComponent(component, ComponentsType.Character);
  }
  changeComponentPosition(cId: string, xChange: number, yChange: number): boolean {
    const character: Components = this._componentManager.getComponent(cId);
    const afterX = character.x + xChange;
    const afterY = character.y + yChange;
    if (this.isInCanvas(afterX, afterY) && this._stepAbleP[afterY][afterX] === -1) {
      character.x = character.x + xChange;
      character.y = character.y + yChange;
      return true;
    } else if (this.isInCanvas(afterX, afterY) && this._componentManager.getComponent(this._stepAbleP[afterY][afterX]).moveAble) {
      if (this.changeComponentPosition(this._stepAbleP[afterY][afterX], xChange, yChange)) {
        character.x = afterX;
        character.y = afterY;
      }
    } else if (this.isInCanvas(afterX, afterY)  && this._componentManager.getComponent(this._stepAbleP[afterY][afterX]).type === ComponentsType.Item) {
      this._componentManager.hideComponent(this._componentManager.getComponent(this._stepAbleP[afterY][afterX]));
      character.x = character.x + xChange;
      character.y = character.y + yChange;
      this.catchEventOccur.next(true);
      return true;
    } else if (this.isInCanvas(afterX, afterY) && this._componentManager.getComponent(this._stepAbleP[afterY][afterX]).type === ComponentsType.Goal) {
      character.x = character.x + xChange;
      character.y = character.y + yChange;
      this.goalEventOccur.next(true);
      return true;
    }
    return false;
  }
  setMapInfoAll() {
    this.clearInfoAll();
    this._componentManager.setAllInfoToMap(this._stepAbleP);
  }
  isInCanvas(x, y) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      return true;
    }
    return false;
  }
  saveFirstComponentPosition() {
    this._componentManager.saveFirstComponentPosition();
  }
  loadFirstComponentPosition() {
    this._componentManager.loadFirstComponentPosition();
  }
}
