import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DialogTaskComponent} from "../dialog-task/dialog-task.component";
import {StorageService} from "../../services/storage/storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatabaseService} from "../../services/database/database.service";

@Component({
  selector: 'app-dialog-add-file',
  templateUrl: './dialog-add-file.component.html',
  styleUrls: ['./dialog-add-file.component.css']
})
export class DialogAddFileComponent implements OnInit {

  // MAX_LENGTH_NAME = 20
  // MIN_LENGTH_NAME = 3
  options = {path: "/assets/select-file.json"}

  file: any
  fileName: string=""
  fileForm = this.fb.group({
    fileName: [null, Validators.required]
  });

  // formControlFile = new FormGroup(
  //   {
  //     nameFile: new FormControl("", [Validators.required,
  //       Validators.minLength(this.MIN_LENGTH_NAME),
  //       Validators.maxLength(this.MAX_LENGTH_NAME)])
  //   }
  // )

  constructor(
    private storage: StorageService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogTaskComponent>,
    private database: DatabaseService
  ) {
  }

  ngOnInit(): void {
  }

  getFile(event: any) {
    this.file = event.target.files[0]
    this.fileName = event.target.files[0].name

  }

  async onSubmit() {
    this.dialog.open(DialogTaskComponent, {
      width: '250px',
      disableClose: true,
      data: {type: 'UPLOAD'}
    });
    const linkFile = await this.storage.uploadFile(this.database.currentPath.value, this.file, this.file.name)
    await this.database.createNewFile(this.file.name, linkFile)
    this.dialogRef.close()
  }

}
