import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface DialogFolderData{
  nameFolder: string;
}

@Component({
  selector: 'app-dialog-add-folder',
  templateUrl: './dialog-add-folder.component.html',
  styleUrls: ['./dialog-add-folder.component.css']
})
export class DialogAddFolderComponent implements OnInit {

  MAX_LENGTH_NAME = 20
  MIN_LENGTH_NAME = 3

  formControlFolder = new FormGroup(
    {
      nameFolder: new FormControl("", [Validators.required,
        Validators.minLength(this.MIN_LENGTH_NAME),
        Validators.maxLength(this.MAX_LENGTH_NAME)])
    }
  )

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogFolderData
  ) { }

  ngOnInit(): void {
  }

}
