import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {getIconFileAndColor} from "../../main-panel/models/FileObject";

@Component({
  selector: 'app-dialog-drop-file',
  templateUrl: './dialog-drop-file.component.html',
  styleUrls: ['./dialog-drop-file.component.css']
})
export class DialogDropFileComponent implements OnInit {

  options = {path: "/assets/select-file.json"}
  fileForm: FormGroup
  fileSelected: File | null = null;
  iconFile: { color: string; icon: IconDefinition } | null = null;

  constructor(
    public dialogRef: MatDialogRef<DialogDropFileComponent>,
  ) {
    this.fileForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
    })
  }

  static openDialog(dialog: MatDialog) {
    return dialog.open(DialogDropFileComponent, {
      width: '550px',
      height: '350px',
      disableClose: true,
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.fileForm.valid) {
      this.dialogRef.close(this.fileSelected)
    }
  }

  async onFileDropped(listFiles: any[]) {
    const listFinalFiles = [...listFiles]
    const file = listFinalFiles[0]
    this.fileSelected = file
    this.fileForm.controls["name"].setValue(file.name)
    this.iconFile = getIconFileAndColor(file.name)
  }

  onClickInputFile(event: any) {
    const file = event.target.files[0]
    this.fileSelected = file
    this.fileForm.controls["name"].setValue(file.name)
    this.iconFile = getIconFileAndColor(file.name)
  }

  clickInput(event: any) {
    const elementRef = (event.target as Element)
    if (elementRef.tagName != 'BUTTON' && elementRef.tagName != 'SPAN') {
      document.getElementById('input-file')?.click();
    }
  }
}
