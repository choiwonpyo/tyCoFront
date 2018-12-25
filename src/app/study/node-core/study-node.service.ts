import { Injectable } from '@angular/core';
import {Direction, NodeType} from "./node";
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class StudyNodeService {
  public actions: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  normalType = NodeType.NORMAL;
  forType = NodeType.FOR;
  globalNodeId = 0;
  globalForNode = 0;
  constructor() { }
  public getXChange(direction: Direction, value: number) {
    if (direction === Direction.LEFT) {
      return -value;
    } else if(direction === Direction.RIGHT) {
      return value;
    }
    return 0;
  }
  public getYChange(direction: Direction, value: number) {
    if (direction === Direction.FRONT) {
      return -value;
    } else if (direction === Direction.BACK) {
      return value;
    }
    return 0;
  }
}
