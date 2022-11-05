import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-upload-file',
  templateUrl: './form-upload-file.component.html',
  styleUrls: ['./form-upload-file.component.css']
})
export class FormUploadFileComponent implements OnInit {

  readonly formFile: FormGroup;
  readonly MAX_LENGTH_NAME = 50
  readonly MAX_LENGTH_DESCRIPTION = 50

  constructor() {
    this.formFile = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dateCreate: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  sendFile() {

  }
}
