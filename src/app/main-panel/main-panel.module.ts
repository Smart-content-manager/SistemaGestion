import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelDragDropComponent } from './panel-drag-drop/panel-drag-drop.component';
import { MatIconModule } from "@angular/material/icon";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatCardModule } from "@angular/material/card";
import { IconObjectFileComponent } from './icon-object-file/icon-object-file.component';
import { MenuFileOptionsComponent } from './menu-file-options/menu-file-options.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { DialogCreateOrUploadComponent } from './dialog-create-or-upload/dialog-create-or-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClickOutsideDirective } from './click-outside.directive';
import { DialogClipboardComponent } from './dialog-clipboard/dialog-clipboard.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    PanelDragDropComponent,
    IconObjectFileComponent,
    MenuFileOptionsComponent,
    DialogCreateOrUploadComponent,
    ClickOutsideDirective,
    DialogClipboardComponent,
    DialogDeleteComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatGridListModule
  ],
  exports: [PanelDragDropComponent]
})
export class MainPanelModule {
}
