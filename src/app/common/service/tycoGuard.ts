import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/index";
import {AppService} from "./AppService";
import {UserInformationService} from "./userInformationService";

@Injectable()
export class TycoGuard implements CanActivateChild {
  constructor(private appService: AppService, private router: Router, private userInformationService: UserInformationService) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.appService.loginCheckToServer().toPromise().then((success: any) => {
        if (!success) {
          this.router.navigate(['/home']);
          return false;
        }
        this.userInformationService.userInformation.subscribe((d: any) => {
          if (!d) {
            this.userInformationService.refreshUserInformationFromServer();
          }
        });
        return true;
      }).catch((error) => {
        this.router.navigate(['/home']);
        return false;
      });
  }
}
