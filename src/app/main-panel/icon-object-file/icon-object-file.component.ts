import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileObject} from "../models/FileType";

@Component({
  selector: 'app-icon-object-file',
  templateUrl: './icon-object-file.component.html',
  styleUrls: ['./icon-object-file.component.css']
})
export class IconObjectFileComponent implements OnInit {

  @Input() fileObject: FileObject | null = null
  @Output() fileClickLeft = new EventEmitter<FileObject>();
  @Output() fileClickRight = new EventEmitter<FileObject>();

  constructor() {
  }

  ngOnInit(): void {
  }

  clickFileLeft() {
    this.fileClickLeft.emit(this.fileObject!)
  }
  clickFileRight(event:any) {
    event.preventDefault()
    this.fileClickRight.emit(this.fileObject!)
  }

}
