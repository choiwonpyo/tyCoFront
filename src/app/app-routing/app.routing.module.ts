import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from '../share/page-not-found/page-not-found.component';
import {StudyModule} from '../study/study.module';
import {HomeComponent} from "../app-component/home/home.component";
import {LoginComponent} from "../app-component/login/login.component";
import {TycoGuard} from "../common/service/tycoGuard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'main', loadChildren: '../main/main.module#MainModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {useHash: true})]
})
export class AppRoutingModule {}
