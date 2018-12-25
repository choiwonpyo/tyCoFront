
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RequestOptions} from "@angular/http";
import {Observable, of} from "rxjs/index";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {CookieService} from "ngx-cookie-service";
import {empty} from "rxjs/internal/Observer";
import {OauthConfigService} from "./oauthConfigService";
import {UserInformationService} from "./userInformationService";

@Injectable()
export class AppService {

  constructor(
    private _router: Router, private _http: HttpClient, private cookieService: CookieService, private userInformationService: UserInformationService,
    private oauthConfigService: OauthConfigService) {}

  obtainAccessToken(loginData) {
    const params = this.oauthConfigService.getOauthParams(loginData);
    const httpHeader = this.oauthConfigService.getHttHeader('oauth');
    this._http.post(this.oauthConfigService.tokenUrl, params,
      {headers: httpHeader})
      .subscribe(data => {
          this.saveToken(data);
          this.userInformationService.getUserInformationFromServer().subscribe((userInformResponse: any) => {
            if (userInformResponse && userInformResponse.success) {
              this.userInformationService.userInformation.next(userInformResponse['resultObject']);
              this._router.navigate(['/main']);
            }
          });
      },
          err => {console.log(err); alert('로그인 실패'); });
  }
  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set('access_token', token.access_token, expireDate, '/');
  }
  isLogined() {
    if (this.oauthConfigService.checkAccessToken()) {
      this._router.navigate(['/main']);
    }
  }
  loginCheckToServer(): Observable<Object> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.oauthConfigService.getAccessToken()});
    return this._http.get(this.oauthConfigService.serverUrl + '/resource/isLogined', {headers: headers});
  }
  logout() {
    this.oauthConfigService.deleteAccessToken();
    console.log('is There Access Token');
    console.log(this.cookieService.check('access_token'));
    console.log(this.cookieService.get('access_token'));
    this._router.navigate(['/home']);
  }
}
