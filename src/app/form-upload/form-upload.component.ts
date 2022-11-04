import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  @Input() filePassed: File | undefined

  readonly formFile: FormGroup
  readonly MAX_LENGTH_NAME = 100
  readonly MAX_LENGTH_DESCRIPTION = 100

  constructor() {
    this.formFile = new FormGroup(
      {
        "name": new FormControl(`${this.filePassed?.name || ''}`, [Validators.required]),
        "description": new FormControl("", [Validators.required]),
        "dateCreate": new FormControl("", [Validators.required]),
      },
    )
  }

  ngOnInit(): void {
  }

}
