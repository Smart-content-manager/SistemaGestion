import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileFormComponent} from './file-form/file-form.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateDirComponent} from './create-dir/create-dir.component';


@NgModule({
  declarations: [
    FileFormComponent,
    CreateDirComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  exports: [
    FileFormComponent,
    CreateDirComponent
  ]
})
export class FormLoadFileModule { }
