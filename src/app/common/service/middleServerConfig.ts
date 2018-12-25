import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MiddleServerConfig{
  middleServerUrl = 'http://45.119.146.51:8124';
  postCommandUrl = this.middleServerUrl + '/control_rasp';
  constructor(private http: HttpClient) {
  }
  sendCommandToServer(command: string) {
    return this.http.post(this.postCommandUrl, {todo: command});
  }
}
