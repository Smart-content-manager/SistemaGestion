import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";
import {StorageService} from "../../services/storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

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
    private serviceS: StorageService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProgressBarComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  getFile(event: any) {
    this.file = event.target.files[0]
    this.fileName = event.target.files[0].name

  }

  async onSubmit() {
    this.dialog.open(ProgressBarComponent, {
      width: '250px',
      disableClose: true,
      data: {type: 'UPLOAD'}
    });
    await this.serviceS.uploadFile(this.file,this.fileName)
    this.dialogRef.close()
  }

}
