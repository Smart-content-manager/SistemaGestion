import { Component, HostListener, OnInit } from '@angular/core';
import { FileObject, FileType } from "../models/FileObject";
import { ActionsFile } from "./ActionsFile";
import { StorageService } from "../../services/storage.service";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DialogCreateOrUploadComponent } from "../dialog-create-or-upload/dialog-create-or-upload.component";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-panel-drag-drop',
  templateUrl: './panel-drag-drop.component.html',
  styleUrls: ['./panel-drag-drop.component.css']
})
export class PanelDragDropComponent implements OnInit {


  fileSelected: FileObject | undefined;
  listFiles: Observable<FileObject[]>;
  historialPath: string[] = [""]

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
    // console.log("Se hizo click izquierdo en angula el archivo " + file.name)
    if (this.fileSelected == file) {
      if (file.type == FileType.FOLDER) {
        this.historialPath.push(file.link)
        let currentFolder = (file.link).split('/')
        console.log(currentFolder.splice(currentFolder.length - 1, 1), currentFolder);
        let folder = currentFolder.splice(currentFolder.length - 1, 1)
        folder = folder.join('/')
        console.log(folder, "folder");
        folder = folder == undefined ? "" : folder
        this.storage.reloadFilesFromPath(file.link, folder)
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
    if (ActionsFile[event.action] == 'DOWNLOAD') {
      this.storage.downloadFile(event.file.link, event.file.name)
    }
    if (ActionsFile[event.action] == 'GET_LINK') {
      this.storage.copyToClipboard(event.file.name)
    }
    if (ActionsFile[event.action] == 'DELETE') {
      this.storage.deleteFile(event.file.name)
    }
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any) {
    const elementRef = (event.target as Element)
    if (elementRef.id === 'main-panel' || elementRef.className === 'ng-star-inserted') {
      this.fileSelected = undefined
    }
  }
}
