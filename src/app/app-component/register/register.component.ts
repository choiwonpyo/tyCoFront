import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegisterService} from "../../common/service/registerService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerData = {userName: '', password: '', passwordCheck: '', nickName: ''};
  public error = {userNameError: false, passwordError: false, passwordCheckError: false, passwordLengthError: false, nickNameError: false};
  @Output() cancelClickEvent = new EventEmitter<any>();
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }
  register() {
    if (this.isThereError()) {
      alert('회원가입 정보 기입을 확인해 주세요');
      return false;
    }
    this.registerService.register(this.registerData).subscribe((data: any) => {
      if (data.success) {
        alert('가입 성공');
        this.cancelClickEvent.emit(true);
      } else {
        const errors = data['resultObject'];
        let error = '';
        const errorKeys = Object.keys(errors);
        errorKeys.forEach((key) => {error = errors[key] + '\n'; });
        alert('가입 실패:: ' + error);
      }
    });
  }
  cancel() {
    this.cancelClickEvent.emit(true);
  }
  checkPasswordCheck() {
    if (this.registerData.password.length < 5) {
      this.error.passwordLengthError = true;
    } else {
      this.error.passwordLengthError = false;
    }
    if (this.registerData.password === this.registerData.passwordCheck){
      this.error.passwordCheckError = false;
    } else {
      this.error.passwordCheckError = true;
    }
  }
  nickNameCheck() {
    if (this.registerData.nickName.length >= 2) {
      this.error.nickNameError = false;
    } else {
      this.error.nickNameError = true;
    }
  }
  userNameCheck() {
    if (this.registerData.userName.length >= 4) {
      this.error.userNameError = false;
    } else {
      this.error.userNameError = true;
    }
  }
  isThereError(): boolean {
    this.nickNameCheck();
    this.userNameCheck();
    this.checkPasswordCheck();
    const keys = Object.keys(this.error);
    let isThereError = false;
    keys.forEach((key) => {
      isThereError = isThereError || this.error[key];
    });
    return isThereError;
  }
}
