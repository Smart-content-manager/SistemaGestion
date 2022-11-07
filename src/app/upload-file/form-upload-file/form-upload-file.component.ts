import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FileObject, getIconFileAndColor} from "../../main-panel/models/FileObject";
import {DatabaseService} from "../../services/database/database.service";
import {DialogTaskComponent, TaskType} from "../../dialogs/dialog-task/dialog-task.component";
import {MatDialog} from "@angular/material/dialog";
import {StorageService} from "../../services/storage/storage.service";
import {v4 as uuidv4} from 'uuid';
import {FileType} from "../../main-panel/models/FileType";
import {Location} from "@angular/common";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Router} from "@angular/router";

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
  readonly MAX_LENGTH_AUTHOR = 50
  readonly MAX_LENGTH_DESCRIPTION = 200

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
  firstDate = Date();

  constructor(
    private storage: StorageService,
    private database: DatabaseService,
    private dialog: MatDialog,
    private route: Router,
    private location: Location
  ) {
    this.formFile = new FormGroup({
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', Validators.required),
      description: new FormControl(''),
      dateCreate: new FormControl(this.getTimeNow(), Validators.required),
      colorFile: new FormControl('', Validators.required),
      soundFile: new FormControl('', Validators.required),
    });
  }

  dateChangeHandler(date: MatDatepickerInputEvent<Date, Date>) {
    const newDate = date.value as Date
    const stringDate: string = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    this.formFile.controls['dateCreate'].setValue(stringDate)
    console.log(stringDate)
  }


  async sendFile() {
    if (this.formFile.valid && this.fileSelected) {

      const name = this.formFile.controls["name"].value
      const objectSomeName = this.database.listCurrent.filter(fileObject => fileObject.type == FileType.FILE).find((value) => value.name == name)


      if (objectSomeName) {
        this.formFile.controls["name"].setErrors({exist: true})
      } else {
        const newId = uuidv4()
        const refTask = DialogTaskComponent.openDialog(this.dialog, TaskType.UPLOAD)
        const linkUrl = await this.storage.uploadFile(newId, this.fileSelected)
        if (linkUrl != "") {
          const newFile = this.getObjectByForm(newId, linkUrl)
          await this.database.createNewFile(newFile)
          refTask.close()
          this.backScreen()
        }
        refTask.close()
      }
    }
  }

  onFileDropped(listFiles: any[]) {
    const listFinalFiles = [...listFiles]
    const file = listFinalFiles[0]
    this.fileSelected = file
    this.formFile.controls["name"].setValue(file.name)
    this.iconFile = getIconFileAndColor(file.name)
  }

  backScreen() {
    this.route.navigateByUrl("/home")
    // this.location.back()
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

  private getObjectByForm(newId: string, linkUrl: string) {
    return <FileObject>{
      id: newId,
      link: linkUrl,
      type: FileType.FILE,
      name: this.formFile.controls["name"].value,
      author: this.formFile.controls["author"].value,
      description: this.formFile.controls["description"].value,
      colorFile: this.formFile.controls["colorFile"].value,
      soundFile: this.formFile.controls["soundFile"].value,
      dateCreate: this.formFile.controls["dateCreate"].value,
    }
  }

  ngOnInit(): void {
  }

  private getTimeNow() {
    const today = new Date();
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  }
}
