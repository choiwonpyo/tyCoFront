import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSkeletonComponent } from './main-skeleton/main-skeleton.component';
import {StudyRoutingModule} from './study-routing/study.routing.module';
import {NgDragDropModule} from 'ng-drag-drop';
import {DragulaModule} from 'ng2-dragula';
import {NodeNamePipe} from './node-core/node-name.pipe';
import { NormalNodeComponent } from './study-nodes/normal-node/normal-node.component';
import { ForNodeComponent } from './study-nodes/for-node/for-node.component';
import {StudyNodeService} from './node-core/study-node.service';
import {MaterialInjectorModule} from "../material-injector/material-injector.module";
import {FormsModule} from "@angular/forms";
import { SimpleScreenComponent } from './simple-screen/simple-screen.component';
import { Stage1Component } from './screen-components/car-adventure/stage1/stage1.component';
import { CarAdventureSelectorComponent } from './screen-components/car-adventure/car-adventure-selector/car-adventure-selector.component';
import { Stage2Component } from './screen-components/car-adventure/stage2/stage2.component';
import { Tutorial1Component } from './screen-components/car-adventure/tutorial1/tutorial1.component';
import { Stage3Component } from './screen-components/car-adventure/stage3/stage3.component';
import { Stage4Component } from './screen-components/car-adventure/stage4/stage4.component';
import { Stage5Component } from './screen-components/car-adventure/stage5/stage5.component';
import { Stage6Component } from './screen-components/car-adventure/stage6/stage6.component';
import { Stage7Component } from './screen-components/car-adventure/stage7/stage7.component';
import {ForNode, NormalNode} from "./node-core/node";

@NgModule({
  imports: [
    CommonModule,
    StudyRoutingModule,
    DragulaModule.forRoot(),
    NgDragDropModule.forRoot(),
    FormsModule,
    MaterialInjectorModule
  ],
  declarations: [MainSkeletonComponent, NodeNamePipe, NormalNodeComponent, ForNodeComponent, SimpleScreenComponent, Stage1Component,
    CarAdventureSelectorComponent, Stage2Component, Tutorial1Component, Stage3Component, Stage4Component, Stage5Component, Stage6Component, Stage7Component],
  providers: [StudyNodeService],
  exports: [NodeNamePipe, NormalNodeComponent, ForNodeComponent]
})
export class StudyModule { }
