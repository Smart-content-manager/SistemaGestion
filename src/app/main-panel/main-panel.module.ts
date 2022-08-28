import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelDragDropComponent} from './panel-drag-drop/panel-drag-drop.component';
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatCardModule} from "@angular/material/card";
import { IconObjectFileComponent } from './icon-object-file/icon-object-file.component';
import { MenuFileOptionsComponent } from './menu-file-options/menu-file-options.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    PanelDragDropComponent,
    IconObjectFileComponent,
    MenuFileOptionsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [PanelDragDropComponent]
})
export class MainPanelModule {
}
