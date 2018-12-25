import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { MainComponent } from './main/main.component';
import {MainRoutingModule} from "./main-routing/main.routing.module";
import {MaterialInjectorModule} from "../material-injector/material-injector.module";
import { MenuPartComponent } from './menu-part/menu-part.component';
import {TycoGuard} from "../common/service/tycoGuard";
import {MiddleServerConfig} from "../common/service/middleServerConfig";

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialInjectorModule
  ],
  declarations: [MainComponent, MenuPartComponent],
  providers: [TycoGuard, MiddleServerConfig],
  exports: []
})
export class MainModule { }
