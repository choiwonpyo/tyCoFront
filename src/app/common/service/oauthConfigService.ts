import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class OauthConfigService {
  private ACCESS_TOKEN_NAME = 'access_token';nn
  private oauthServer = 'http://45.119.146.51:8080'; // 'http://45.119.146.51:8080'
  private oauthTokenUrl = this.oauthServer + '/oauth/token';
  private client_id = 'spring-security-oauth2-read-write-client';
  private client_password = 'spring-security-oauth2-read-write-client-password1234';
  private authorizationCode = 'Basic ' + btoa(`${this.client_id}:${this.client_password}`);
  public HTTP_HEADER_MODE = {oauth: 'oauth', resource: 'resource'};
  constructor(private cookieService: CookieService) {}
  get tokenUrl() {
    console.log(this.oauthTokenUrl);
    return this.oauthTokenUrl;
  }
  get serverUrl() {
    return this.oauthServer;
  }
  get accessTokenName() {
    return this.ACCESS_TOKEN_NAME;
  }
  public getHttHeader(mode: string): HttpHeaders {
    if (mode === 'oauth') {
      return new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.authorizationCode});
    } else if (mode === 'resource') {
      return new HttpHeaders({'Authorization': `Bearer ${this.getAccessToken()}`});
    }
    return null;
  }
  public getOauthParams(loginData): string {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', this.client_id);
    return params.toString();
  }
  public getAccessToken(): string {
    return this.cookieService.get(this.ACCESS_TOKEN_NAME);
  }
  public deleteAccessToken() {
    this.cookieService.delete(this.ACCESS_TOKEN_NAME, '/');
  }
  public checkAccessToken(): boolean {
    return this.cookieService.check(this.ACCESS_TOKEN_NAME);
  }
}
