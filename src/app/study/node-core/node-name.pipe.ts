import {Pipe, PipeTransform} from "@angular/core";
import {Direction} from "./node";

@Pipe({name: 'nodeName'})
export class NodeNamePipe implements PipeTransform{
  transform(value: Direction, exponent: string) {
    return this.getName(value);
  }
  getName(direction: Direction) {
    if (direction === Direction.FRONT) {
      return '위로';
    } else if (direction === Direction.BACK) {
      return '아래로';
    } else if (direction === Direction.LEFT) {
      return '왼쪽으로';
    } else {
      return '오른쪽으로';
    }
  }
}
