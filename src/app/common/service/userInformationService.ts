
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OauthConfigService} from "./oauthConfigService";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs/index";

@Injectable()
export class UserInformationService {
  public userInformation: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient, private oauthConfig: OauthConfigService, private cookieService: CookieService) {}
  public getUserInformationFromServer(): Observable<Object> {
    const header = this.oauthConfig.getHttHeader(this.oauthConfig.HTTP_HEADER_MODE.resource);
    return this.http.get(this.oauthConfig.serverUrl + '/resource/tyCoUser', {headers: header});
  }
  public refreshUserInformationFromServer() {
    this.getUserInformationFromServer().subscribe((data: any) => {
      if (data && data.success) {
        this.userInformation.next(data.resultObject);
      }
    });
  }
}
