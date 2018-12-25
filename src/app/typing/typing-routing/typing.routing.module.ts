import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TypingMainSkeletonComponent} from "../typing-main-skeleton/typing-main-skeleton.component";
import {BaseTypingComponent} from "../content-component/base-typing/base-typing.component";
import {WordTypingComponent} from "../content-component/word-typing/word-typing.component";
import {ParagraphTypingComponent} from "../content-component/paragraph-typing/paragraph-typing.component";

const routes: Routes = [
  {
    path: '',
    component: TypingMainSkeletonComponent,
    children: [{path: '', redirectTo: 'base'},
      {path: 'base', component: BaseTypingComponent},
      {path: 'word', component: WordTypingComponent},
      {path: 'paragraph', component: ParagraphTypingComponent}]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypingRoutingModule { }
