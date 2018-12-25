import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MaterialInjectorModule} from "../material-injector/material-injector.module";
import {UserInformationService} from "../common/service/userInformationService";
import {StudyModule} from "../study/study.module";
import {DragulaModule} from "ng2-dragula";
import {CarHandleRoutingHandle} from "./car-handle-routing/car-handle.routing.handle";
import {CarHandleMainSkeletonComponent} from "./car-handle-main-skeleton/car-handle-main-skeleton.component";

@NgModule({
  imports: [
    CarHandleRoutingHandle,
    CommonModule,
    StudyModule,
    FormsModule,
    DragulaModule.forRoot(),
    MaterialInjectorModule,
  ],
  declarations: [CarHandleMainSkeletonComponent],
  providers: [],
  exports: []
})
export class CarHandleModule { }
