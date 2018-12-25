import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MaterialInjectorModule} from "../material-injector/material-injector.module";
import { TypingMainSkeletonComponent } from './typing-main-skeleton/typing-main-skeleton.component';
import {TypingRoutingModule} from "./typing-routing/typing.routing.module";
import { BaseTypingComponent } from './content-component/base-typing/base-typing.component';
import { SpeedWagonComponent } from './content-component/speed-wagon/speed-wagon.component';
import { StartTestComponent } from './content-component/start-test/start-test.component';
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import { ParagraphTypingComponent } from './content-component/paragraph-typing/paragraph-typing.component';
import { WordTypingComponent } from './content-component/word-typing/word-typing.component';
import {ContentSettingService} from "./content-service/content-setting.service";
import {TyCoStudyService} from "../common/service/tyCoStudyService";
import {UserInformationService} from "../common/service/userInformationService";

@NgModule({
  imports: [
    CommonModule,
    TypingRoutingModule,
    FormsModule,
    MaterialInjectorModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
  ],
  declarations: [TypingMainSkeletonComponent, BaseTypingComponent, SpeedWagonComponent, StartTestComponent, ParagraphTypingComponent, WordTypingComponent],
  providers: [ContentSettingService, TyCoStudyService],
  exports: []
})
export class TypingModule { }
