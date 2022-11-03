import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from 'src/app/services/storage/storage.service';
import {DatabaseService} from "../../services/database/database.service";

export interface DialogInputNameData {
  defaultValue: string | "";
  nameInput: string;
  titleDialog: string;
  maxLengthName: number;
  hintDialog: string;
  iconDialog: string;
}

@Component({
  selector: 'app-dialog-input-name',
  templateUrl: './dialog-input-name-item.component.html',
  styleUrls: ['./dialog-input-name-item.component.css']
})
export class DialogInputNameItemComponent implements OnInit {

  formControlFolder: FormGroup<{ nameInput: FormControl<string | "" | null> }>;
  titleDialog: string
  hintDialog: string
  nameInput: string
  namePassed: string
  iconDialog: string
  maxLengthName: number


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInputNameData,
    private storage: StorageService,
    private dialogRef: MatDialogRef<DialogInputNameItemComponent>,
    private database: DatabaseService
  ) {
    this.iconDialog = data.iconDialog
    this.titleDialog = data.titleDialog
    this.hintDialog = data.hintDialog
    this.maxLengthName = data.maxLengthName
    this.nameInput = data.nameInput
    this.namePassed = data.defaultValue
    this.formControlFolder = new FormGroup({
        nameInput: new FormControl(this.namePassed, [Validators.required,
          Validators.maxLength(this.maxLengthName)])
      }
    )

  }

  ngOnInit(): void {

  }

  async validateNameFolder() {
    const listFolders = this.database.listCurrent;
    if (this.formControlFolder!.valid) {

      const nameFolder = this.formControlFolder!.controls['nameInput'].value

      if(nameFolder==this.namePassed){
        this.formControlFolder!.controls['nameInput'].setErrors({sameName: true})
      }else {
        const findFolder = listFolders.find((value) => value.name == nameFolder)
        if (findFolder) {
          this.formControlFolder!.controls['nameInput'].setErrors({exist: true})
        } else {
          this.dialogRef.close(nameFolder);
        }
      }
    }
  }
}
