import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelDragDropComponent} from './panel-drag-drop/panel-drag-drop.component';
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatCardModule} from "@angular/material/card";
import {IconObjectFileComponent} from './icon-object-file/icon-object-file.component';
import {MenuFileOptionsComponent} from './menu-file-options/menu-file-options.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {DialogCreateOrUploadComponent} from './dialog-create-or-upload/dialog-create-or-upload.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LottieModule} from "ngx-lottie";


@NgModule({
  declarations: [
    PanelDragDropComponent,
    IconObjectFileComponent,
    MenuFileOptionsComponent,
    DialogCreateOrUploadComponent,
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
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatGridListModule,
    LottieModule
  ],
  exports: [PanelDragDropComponent]
})
export class MainPanelModule {
}
