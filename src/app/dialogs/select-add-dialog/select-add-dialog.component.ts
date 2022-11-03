import {Component, OnInit} from '@angular/core';
import {FileType} from "../../main-panel/models/FileType";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-select-add-dialog',
  templateUrl: './select-add-dialog.component.html',
  styleUrls: ['./select-add-dialog.component.css']
})
export class SelectAddDialogComponent implements OnInit {

  FILE = FileType.FILE
  FOLDER = FileType.FOLDER

  constructor() {
  }

  static openDialog(dialog: MatDialog) {
    return dialog.open(SelectAddDialogComponent, {
      width: '250px',
    });
  }

  ngOnInit(): void {
  }

}
