import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";

export const HOME_PATH = 'home'

const routes: Routes = [
  {
    path: HOME_PATH,
    component: HomeComponent
  },
  {path: '**', redirectTo: HOME_PATH}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
