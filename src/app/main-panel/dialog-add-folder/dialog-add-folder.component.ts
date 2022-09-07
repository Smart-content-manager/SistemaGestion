import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from 'src/app/services/storage.service';

export interface DialogFolderData {
  nameFolder: string;
}

@Component({
  selector: 'app-dialog-add-folder',
  templateUrl: './dialog-add-folder.component.html',
  styleUrls: ['./dialog-add-folder.component.css']
})
export class DialogAddFolderComponent implements OnInit {

  MAX_LENGTH_NAME = 20

  formControlFolder = new FormGroup(
    {
      nameFolder: new FormControl("", [Validators.required,
        Validators.maxLength(this.MAX_LENGTH_NAME)])
    }
  )

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogFolderData,
    private storage: StorageService,
    private dialogRef: MatDialogRef<DialogAddFolderComponent>
  ) {
  }

  ngOnInit(): void {
  }

  async validateNameFolder() {
    const listFolders = this.storage.currentListFilesInFolder
    if (this.formControlFolder.valid) {
      const nameFolder = this.formControlFolder.controls.nameFolder.value
      const findFolder = listFolders.find((value) => value.name == nameFolder)
      if (findFolder) {
        this.formControlFolder.controls.nameFolder.setErrors({exist: true})
      } else {
        this.dialogRef.close(nameFolder);
      }
    }
  }


}
