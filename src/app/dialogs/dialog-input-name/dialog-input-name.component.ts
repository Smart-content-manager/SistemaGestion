import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatabaseService} from "../../services/database/database.service";
import {FileType} from "../../main-panel/models/FileType";
import {FileObject} from "../../main-panel/models/FileObject";

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

  readonly typeInput: TypeInput

  namePassed: string

  constructor(
    private database: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: DialogInputNameData,
    private dialogRef: MatDialogRef<DialogInputNameComponent>,
  ) {
    this.typeInput = data.typeInput

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
    if (this.formControlFolder.valid) {

      const controlName = this.formControlFolder.controls['nameInput']
      const newName = controlName.value


      if (newName == this.namePassed) {
        this.formControlFolder.controls['nameInput'].setErrors({sameName: true})
      } else {
        let objectSomeName: FileObject | undefined
        if (this.typeInput == TypeInput.CREATE_FOLDER || this.typeInput == TypeInput.RENAME_FOLDER) {
          objectSomeName = this.database.listCurrent.filter(fileObject => fileObject.type == FileType.FOLDER).find((value) => value.name == newName)
        } else {
          objectSomeName = this.database.listCurrent.filter(fileObject => fileObject.type == FileType.FILE).find((value) => value.name == newName)
        }
        if (objectSomeName) {
          controlName.setErrors({exist: true})
        } else {
          this.dialogRef.close(newName);
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

  getErrorName() {
    const controlName = this.formControlFolder.controls['nameInput']
    if (controlName.hasError("required")) {
      return "El nombre es requerido"
    } else if (controlName.hasError("sameName")) {
      return "El nombre no puede ser el mismo"
    } else if (controlName.hasError("exist")) {
      return "El nombre ya existe"
    } else {
      return ""
    }
  }
}
