import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileObject} from "../models/FileObject";
import {MatMenuPanel, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-icon-object-file',
  templateUrl: './icon-object-file.component.html',
  styleUrls: ['./icon-object-file.component.css']
})
export class IconObjectFileComponent implements OnInit {

  @ViewChild('iconFileTrigger') iconFileTrigger: MatMenuTrigger | undefined;

  @Input() menu: MatMenuPanel | null = null;

  @Input() fileObject: FileObject | undefined;
  @Input() currentSelectedFile: FileObject | undefined

  @Output() fileClickLeft = new EventEmitter<FileObject>();
  @Output() fileClickRight = new EventEmitter<FileObject>();

  constructor() {
  }

  ngOnInit(): void {
  }

  clickFileLeft() {
    this.fileClickLeft.emit(this.fileObject!)
    this.iconFileTrigger?.closeMenu()
  }
  clickFileRight(event:any) {
    event.preventDefault()
    this.fileClickRight.emit(this.fileObject!)
    this.iconFileTrigger?.openMenu()
  }

}
