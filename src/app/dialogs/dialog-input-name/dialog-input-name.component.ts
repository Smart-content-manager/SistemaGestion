import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatabaseService} from "../../services/database/database.service";

export const enum TypeInput {
  RENAME_FILE, RENAME_FOLDER, CREATE_FOLDER
}

export interface DialogInputNameData {
  typeInput: TypeInput,
  namePassed: string;
}


@Component({
  selector: 'app-dialog-input-name',
  templateUrl: './dialog-input-name.component.html',
  styleUrls: ['./dialog-input-name.component.css']
})
export class DialogInputNameComponent implements OnInit {

  readonly formControlFolder: FormGroup
  readonly maxLengthName: number = 50;

  readonly titleDialog: string
  readonly nameInput: string

  namePassed: string

  constructor(
    private database: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: DialogInputNameData,
    private dialogRef: MatDialogRef<DialogInputNameComponent>,
  ) {
    this.titleDialog = this.getTile(data.typeInput);
    this.nameInput = this.getTile(data.typeInput);


    this.namePassed = data.namePassed
    this.formControlFolder = new FormGroup({
        nameInput: new FormControl(this.namePassed, [Validators.required,
          Validators.maxLength(this.maxLengthName)])
      }
    )
  }

  static openDialog(type: TypeInput, dialog: MatDialog, namePassed: string) {
    return dialog.open(DialogInputNameComponent, {
      width: '350px',
      data: <DialogInputNameData>{
        typeInput: type,
        namePassed: namePassed
      }
    });
  }

  ngOnInit(): void {
  }

  async validateNameInput() {
    const listFolders = this.database.listCurrent;
    if (this.formControlFolder!.valid) {

      const nameFolder = this.formControlFolder!.controls['nameInput'].value

      if (nameFolder == this.namePassed) {
        this.formControlFolder!.controls['nameInput'].setErrors({sameName: true})
      } else {
        const findFolder = listFolders.find((value) => value.name == nameFolder)
        if (findFolder) {
          this.formControlFolder!.controls['nameInput'].setErrors({exist: true})
        } else {
          this.dialogRef.close(nameFolder);
        }
      }
    }
  }

  private getTile(type: TypeInput): string {
    if (type === TypeInput.RENAME_FILE) {
      return 'Renombrar Archivo'
    } else if (type === TypeInput.RENAME_FOLDER) {
      return "Renombrar Carpeta"
    } else if (type === TypeInput.CREATE_FOLDER) {
      return "Crear Carpeta"
    } else {
      return ""
    }
  }
}
