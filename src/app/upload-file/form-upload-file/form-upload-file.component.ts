import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {getIconFileAndColor} from "../../main-panel/models/FileObject";

export interface MapInput {
  key: string,
  value: string
}

@Component({
  selector: 'app-form-upload-file',
  templateUrl: './form-upload-file.component.html',
  styleUrls: ['./form-upload-file.component.css']
})
export class FormUploadFileComponent implements OnInit {

  readonly formFile: FormGroup;
  readonly MAX_LENGTH_NAME = 50
  readonly MAX_LENGTH_DESCRIPTION = 50
  readonly MAX_LENGTH_AUTHOR = 50

  readonly listColor = [
    <MapInput>{key: "a", value: "Un color"},
    <MapInput>{key: "b", value: "Blanco y negro"},
    <MapInput>{key: "c", value: "Multicolor"},
    <MapInput>{key: "g", value: "Escala de gris"},
    <MapInput>{key: "n", value: "No se aplica al caso "},
  ];

  readonly listSound = [
    <MapInput>{key: "#", value: "Sin sonido"},
    <MapInput>{key: "a", value: "Contiene sonido"},
    <MapInput>{key: "u", value: "Desconocido"},
  ];

  readonly options = {path: "/assets/select-file.json"}
  fileSelected: File | null = null;
  iconFile: { color: string; icon: IconDefinition } | null = null;

  constructor() {
    this.formFile = new FormGroup({
      name: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dateCreate: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      sound: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  sendFile() {

  }

  async onFileDropped(listFiles: any[]) {
    const listFinalFiles = [...listFiles]
    const file = listFinalFiles[0]
    this.fileSelected = file
    this.formFile.controls["name"].setValue(file.name)
    this.iconFile = getIconFileAndColor(file.name)
  }

  onClickInputFile(event: any) {
    const file = event.target.files[0]
    this.fileSelected = file
    this.formFile.controls["name"].setValue(file.name)
    this.iconFile = getIconFileAndColor(file.name)
  }

  onFakeClickFile() {
    document.getElementById('input-file')?.click();
  }
}
