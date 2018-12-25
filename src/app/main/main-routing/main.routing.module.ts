import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "../main/main.component";
import {NgModule} from "@angular/core";
import {MenuPartComponent} from "../menu-part/menu-part.component";
import {TycoGuard} from "../../common/service/tycoGuard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [TycoGuard],
    children: [{path: '', redirectTo: 'menu'},
      {path: 'menu', component: MenuPartComponent},
      {path: 'study', loadChildren: '../../study/study.module#StudyModule'},
      {path: 'typing', loadChildren: '../../typing/typing.module#TypingModule'},
      {path: 'car-handle', loadChildren: '../../car-handle/car-handle.module#CarHandleModule'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
