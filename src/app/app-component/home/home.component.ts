import { Component, OnInit } from '@angular/core';
import {AppService} from "../../common/service/AppService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public  middleDivFlex = 1;
  public loginClicked = false;
  public  registerClicked = false;
  constructor(appService: AppService) {
    appService.isLogined();
  }

  ngOnInit() {
  }
  loginButtonClick() {
    this.middleDivFlex = 4;
    this.loginClicked = true;
  }
  cancelButtonClicked() {
    this.middleDivFlex = 1;
    this.loginClicked = false;
  }
  registerButtonClick() {
    this.middleDivFlex = 4;
    this.registerClicked = true;
  }
  registerCancelButtonClicked() {
    this.middleDivFlex = 1;
    this.registerClicked = false;
  }
}
