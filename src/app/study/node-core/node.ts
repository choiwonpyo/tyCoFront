export enum Direction  {
  NONE = -1,
  FRONT = 0,
  BACK = 1,
  LEFT = 2,
  RIGHT = 3,
}
export enum NodeType {
  NORMAL = 0,
  FOR = 1,
  NONE = -1
}
export abstract class StudyNode {
  constructor() {}
  abstract getType(): NodeType;
  abstract getEvery(): Direction[];
}
export class NoneNode extends StudyNode{
  constructor() {
    super();
  }
  getType(): NodeType {
    return NodeType.NONE;
  }
  getEvery(): Direction[] {
    return [Direction.NONE];
  }
}
export class NormalNode extends StudyNode {
  _direction: Direction;
  _id: number;
  constructor(inputDirection: Direction, id: number) {
    super();
    this._direction = inputDirection;
    this._id = id;
  }
  get id(): number {
    return this._id;
  }
  getType(): NodeType {
    return NodeType.NORMAL;
  }
  getEvery(): Direction[] {
    return [this._direction];
  }
}

export class ForNode extends StudyNode {
  _nodeList: StudyNode[];
  _id: number;
  _loopCount: number;
  constructor(id: number) {
    super();
    this._nodeList = [];
    this._id = id;
    this._loopCount = 1;
  }
  get id() {
    return this.id;
  }
  get loopCount() {
    return this._loopCount;
  }
  set loopCount(num: number){
    this._loopCount = num;
  }
  getType(): NodeType {
    return NodeType.FOR;
  }
  get nodeList(): StudyNode[] {
    return this._nodeList;
  }
  set nodeList(nodes: StudyNode[]) {
    this._nodeList = [...nodes];
  }
  getEvery(): Direction[] {
    const values = this._nodeList.map((e) => e.getEvery()).reduce((ac, value, index, array) => ([...ac, ...value]), []);
    let returnValue = [];
    for (let i = 0; i < this.loopCount; i++) {
      returnValue = [...returnValue, ...values];
    }
    return returnValue;
  }
}
