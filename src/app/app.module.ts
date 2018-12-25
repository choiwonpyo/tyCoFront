import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ShareModule} from './share/share.module';
import {AppRoutingModule} from './app-routing/app.routing.module';
import {DragulaModule} from "ng2-dragula";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CookieService} from "ngx-cookie-service";
import { LoginComponent } from './app-component/login/login.component';
import { HomeComponent } from './app-component/home/home.component';
import {FormsModule} from "@angular/forms";
import {AppService} from "./common/service/AppService";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {MaterialInjectorModule} from "./material-injector/material-injector.module";
import {XhrInterceptor} from "./common/interceptor";
import {OauthConfigService} from "./common/service/oauthConfigService";
import { RegisterComponent } from './app-component/register/register.component';
import {RegisterService} from "./common/service/registerService";
import {TycoGuard} from "./common/service/tycoGuard";
import {TyCoStudyService} from "./common/service/tyCoStudyService";
import {UserInformationService} from "./common/service/userInformationService";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ShareModule,
    DragulaModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MaterialInjectorModule
  ],
  providers: [CookieService, AppService, RegisterService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
    OauthConfigService, TycoGuard, TyCoStudyService, UserInformationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
