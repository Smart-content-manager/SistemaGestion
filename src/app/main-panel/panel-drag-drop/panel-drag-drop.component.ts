import {Component, OnInit} from '@angular/core';
import {FileObject, FileType} from "../models/FileObject";
import {ActionsFile} from "./ActionsFile";
import {StorageService} from "../../services/storage.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateOrUploadComponent} from "../dialog-create-or-upload/dialog-create-or-upload.component";

@Component({
  selector: 'app-panel-drag-drop',
  templateUrl: './panel-drag-drop.component.html',
  styleUrls: ['./panel-drag-drop.component.css']
})
export class PanelDragDropComponent implements OnInit {


  fileSelected: FileObject | undefined;
  listFiles: Observable<FileObject[]>;

  constructor(
    private storage: StorageService,
    private dialog: MatDialog
  ) {
    // * add listener for change files for current directory
    this.listFiles = storage.listFilesInFolder

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateOrUploadComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case FileType.FILE:
          console.log("Se selecciono subir un archivo");
          break;
          case FileType.FOLDER:
            console.log("Se selecciono crear un directorio")
          break;
        default:
          console.log("No se selecciono una opcion valida")
      }
    });
  }

  ngOnInit(): void {
  }

  clickLeft(file: FileObject) {
    // console.log("Se hizo click izquierdo en angulael archivo " + file.name)
    if (this.fileSelected == file) {
      if (file.type == FileType.FOLDER) {
        console.log(`dir = ${file.link}`)
        this.storage.reloadFilesFromPath(file.link)
      }
    } else {
      this.fileSelected = file;
    }
  }

  clickRight(file: FileObject) {
    // console.log("Se hizo click derecho en el archivo " + file.name)
    this.fileSelected = file;

  }

  listerClickAction(event: { action: ActionsFile; file: FileObject }) {
    console.log(`accion recibida ${ActionsFile[event.action]} en el archivo ${event.file.name}`)
  }
}
