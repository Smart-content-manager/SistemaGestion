import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileObject} from "../models/FileObject";
import {MatMenuPanel, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-icon-object-file',
  templateUrl: './icon-object-file.component.html',
  styleUrls: ['./icon-object-file.component.css']
})
export class IconObjectFileComponent implements OnInit {

  // * get trigger for open or close menu programmatically
  @ViewChild('iconFileTrigger') iconFileTrigger: MatMenuTrigger | undefined;

  // * get menu trigger for another component
  @Input() menu: MatMenuPanel | null = null;

  // * get file object for paining property's
  @Input() fileObject: FileObject | undefined;

  // * get the curren file selected for change the background color if is needed
  @Input() currentSelectedFile: FileObject | undefined

  // * capture the click events
  @Output() fileClickLeft = new EventEmitter<FileObject>();
  @Output() fileClickRight = new EventEmitter<FileObject>();

  constructor() {
  }

  ngOnInit(): void {
  }

  // * send event click left and no open the contextual menu
  // ! os no has "no open action", so close menu
  clickFileLeft(event: any) {
    event.stopPropagation()
    this.fileClickLeft.emit(this.fileObject!)
    this.iconFileTrigger?.closeMenu()
  }

  // * prevent normal menu when clicked right and show owner menu
  clickFileRight(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.fileClickRight.emit(this.fileObject!)
    this.iconFileTrigger?.openMenu()
  }

}
