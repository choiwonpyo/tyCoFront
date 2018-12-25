import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppService} from "../../common/service/AppService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData = {username: '', password: ''};
  @Output() cancelClickEvent = new EventEmitter<any>();
  constructor(private _service: AppService) {}

  login() {
    this._service.obtainAccessToken(this.loginData);
  }
  cancel() {
    this.cancelClickEvent.emit(true);
  }
  ngOnInit(): void {
  }

}
