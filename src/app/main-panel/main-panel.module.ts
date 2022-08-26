import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelDragDropComponent} from './panel-drag-drop/panel-drag-drop.component';
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatCardModule} from "@angular/material/card";
import { IconObjectFileComponent } from './icon-object-file/icon-object-file.component';


@NgModule({
  declarations: [
    PanelDragDropComponent,
    IconObjectFileComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule
  ],
  exports: [PanelDragDropComponent]
})
export class MainPanelModule {
}
