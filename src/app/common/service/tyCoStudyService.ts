import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {OauthConfigService} from "./oauthConfigService";
import {Observable} from "rxjs/index";

@Injectable()
export class TyCoStudyService {
  constructor(private http: HttpClient, private oauthConfig: OauthConfigService) {}
  public clearTypingStage(subject: string, step: number): Observable<Object> {
    const header = this.oauthConfig.getHttHeader(this.oauthConfig.HTTP_HEADER_MODE.resource);
    return this.http.post(this.oauthConfig.serverUrl + '/resource/typingStep/clear', {subject: subject, step: step}, {headers: header});
  }
}
