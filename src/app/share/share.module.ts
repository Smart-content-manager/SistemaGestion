import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DndDirective} from "./directives/dnd.directive";


@NgModule({
  declarations: [
    DndDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DndDirective
  ]
})
export class ShareModule {
}
