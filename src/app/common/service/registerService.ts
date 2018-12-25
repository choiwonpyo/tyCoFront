import {Injectable} from "@angular/core";
import {OauthConfigService} from "./oauthConfigService";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable()
export class RegisterService {
  constructor(private oauthConfig: OauthConfigService, private _http: HttpClient, private cookieService: CookieService) {
  }
  public register(registerData): Observable<any> {
    return this._http.post(this.oauthConfig.serverUrl + '/register', registerData);
  }
}
