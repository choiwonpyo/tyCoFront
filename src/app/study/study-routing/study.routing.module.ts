import {RouterModule, Routes} from '@angular/router';
import {MainSkeletonComponent} from '../main-skeleton/main-skeleton.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainSkeletonComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule { }
