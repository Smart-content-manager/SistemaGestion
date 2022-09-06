import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FileType} from "../models/FileType";

export interface DialogData {
  fileType: FileType;
}

@Component({
  selector: 'app-dialog-create-or-upload',
  templateUrl: './dialog-create-or-upload.component.html',
  styleUrls: ['./dialog-create-or-upload.component.css']
})

export class DialogCreateOrUploadComponent implements OnInit {
  FILE = FileType.FILE
  FOLDER = FileType.FOLDER

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
  }

}
