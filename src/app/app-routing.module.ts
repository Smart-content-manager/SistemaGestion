import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth/auth.component";
import {PanelDragDropComponent} from "./main-panel/panel-drag-drop/panel-drag-drop.component";
import {MyAuthGuard} from "./MyAuthGuard";
import {FormUploadFileComponent} from "./upload-file/form-upload-file/form-upload-file.component";

const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PanelDragDropComponent, canActivate: [MyAuthGuard]},
  {path: 'newFile', component: FormUploadFileComponent, canActivate: [MyAuthGuard]},
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
