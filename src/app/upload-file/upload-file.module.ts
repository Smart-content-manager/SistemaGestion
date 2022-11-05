import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormUploadFileComponent} from "./form-upload-file/form-upload-file.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    FormUploadFileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    FormUploadFileComponent
  ]
})
export class UploadFileModule {
}
