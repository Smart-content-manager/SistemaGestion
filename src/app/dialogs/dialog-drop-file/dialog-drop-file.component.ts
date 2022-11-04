import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-drop-file',
  templateUrl: './dialog-drop-file.component.html',
  styleUrls: ['./dialog-drop-file.component.css']
})
export class DialogDropFileComponent implements OnInit {

  options = {path: "/assets/select-file.json"}
  fileForm: FormGroup

  constructor() {
    this.fileForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
    })
  }

  static openDialog(dialog: MatDialog) {
    dialog.open(DialogDropFileComponent, {
      width: '550px',
      height: '350px',
      disableClose: true,
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  async onFileDropped(listFiles: any[]) {
    const listFinalFiles = [...listFiles]
    const file = listFinalFiles[0]
    this.fileForm.controls["name"].setValue(file.name)
  }

  onClickInputFile(event: any) {
    const file = event.target.files[0]
    this.fileForm.controls["name"].setValue(file.name)
  }

  clickInput(event: any) {
    const elementRef = (event.target as Element)
    if (elementRef.tagName != 'BUTTON' && elementRef.tagName != 'SPAN') {
      document.getElementById('input-file')?.click();
    }
  }
}
