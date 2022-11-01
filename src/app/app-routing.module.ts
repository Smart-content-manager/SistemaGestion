import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'; // CLI imports router
import {AuthComponent} from "./auth/auth/auth.component";
import {PanelDragDropComponent} from "./main-panel/panel-drag-drop/panel-drag-drop.component";
import {MyAuthGuard} from "./MyAuthGuard";

const routes: Routes = [
  {path: '', pathMatch: "full", component: PanelDragDropComponent, canActivate: [MyAuthGuard]},
  {path: 'login', component: AuthComponent},
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
