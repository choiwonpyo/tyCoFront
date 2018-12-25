import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CarHandleMainSkeletonComponent} from "../car-handle-main-skeleton/car-handle-main-skeleton.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'carHandle',
  },
  {
    path: 'carHandle',
    component: CarHandleMainSkeletonComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarHandleRoutingHandle { }
