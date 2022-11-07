import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormUploadFileComponent} from "./form-upload-file/form-upload-file.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LottieModule} from "ngx-lottie";
import {ShareModule} from '../share/share.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    FormUploadFileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule,
    LottieModule,
    ShareModule,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    FormUploadFileComponent
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class UploadFileModule {
}
