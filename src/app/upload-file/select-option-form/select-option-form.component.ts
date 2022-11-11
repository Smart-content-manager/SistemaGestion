import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatSelectChange} from "@angular/material/select";
import {PropertyEncode} from "../PropertysEncode";


@Component({
  selector: 'app-select-option-form',
  templateUrl: './select-option-form.component.html',
  styleUrls: ['./select-option-form.component.css']
})
export class SelectOptionFormComponent implements OnInit {

  @Input() listOptions: PropertyEncode[] = [];
  @Input() label: string = "";
  @Input() errorRequire: string = ""
  @Input() nameControl: string = "";
  @Input() form: FormGroup | undefined
  @Output() changeValueListener = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeOption(event: MatSelectChange) {
    if (this.form) {
      this.form.controls[this.nameControl].setValue(event.value);
    }
  }
}
