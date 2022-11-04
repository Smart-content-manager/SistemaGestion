import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogTaskComponent} from './dialog-task/dialog-task.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {LottieModule} from "ngx-lottie";
import {SelectAddDialogComponent} from './select-add-dialog/select-add-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogInputNameComponent} from './dialog-input-name/dialog-input-name.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DialogDropFileComponent} from './dialog-drop-file/dialog-drop-file.component';
import {ShareModule} from "../share/share.module";

@NgModule({
  declarations: [
    DialogTaskComponent,
    SelectAddDialogComponent,
    DialogInputNameComponent,
    DialogDropFileComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    LottieModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ShareModule,
  ],
  exports: [
    DialogTaskComponent,
    SelectAddDialogComponent,
    DialogInputNameComponent
  ]
})
export class DialogsModule {
}
