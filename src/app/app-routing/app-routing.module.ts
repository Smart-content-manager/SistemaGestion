import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PanelDragDropComponent } from '../main-panel/panel-drag-drop/panel-drag-drop.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PanelDragDropComponent
  },
  // { path: 'add-file', component: FileFormComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
