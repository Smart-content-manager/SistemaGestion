import {Component, Input, OnInit} from '@angular/core';
import {FileObject} from "../models/FileType";

@Component({
  selector: 'app-menu-file-options',
  templateUrl: './menu-file-options.component.html',
  styleUrls: ['./menu-file-options.component.css']
})
export class MenuFileOptionsComponent implements OnInit {

  @Input() currentFile: FileObject | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
