import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-part',
  templateUrl: './menu-part.component.html',
  styleUrls: ['./menu-part.component.css']
})
export class MenuPartComponent implements OnInit {
  menuList: MenuPart[] = [{img: 'assets/keyboard_main.png', name: '타자 연습', routerUrl: '/main/typing'},
    {img: 'assets/puzzle_main.png', name: '문제 연습', routerUrl: '/main/study'},
    {img: 'assets/car_main.png', name: '자동차 조종', routerUrl: '/main/car-handle'}];
  constructor() { }

  ngOnInit() {
  }

}
interface MenuPart {
  img: string;
  name: string;
  routerUrl: string;
}
