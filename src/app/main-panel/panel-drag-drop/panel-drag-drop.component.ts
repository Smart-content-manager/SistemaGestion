import {Component, HostListener, OnInit} from '@angular/core';
import {FileObject, FileType} from "../models/FileObject";
import {ActionsFile} from "./ActionsFile";
import {StorageService} from "../../services/storage.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateOrUploadComponent} from "../dialog-create-or-upload/dialog-create-or-upload.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-panel-drag-drop',
  templateUrl: './panel-drag-drop.component.html',
  styleUrls: ['./panel-drag-drop.component.css']
})
export class PanelDragDropComponent implements OnInit {


  fileSelected: FileObject | undefined;
  fileSelectedLeft: FileObject | any;
  listFiles: Observable<FileObject[]>;
  historyPath: string[] = [""]  //* Si regresa a commits anteriores guarde este fracmento de codigo ya que existia un bug

  constructor(
    private storage: StorageService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _clipboard: Clipboard,
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

  //* Si regresa a commits anteriores guarde este fracmento de codigo ya que existia un bug
  clickLeft(file: FileObject) {
    if (file.type === FileType.FOLDER) {
      if (this.fileSelectedLeft === file) {
        file.name != "../" ? this.historyPath.push(file.link) : this.historyPath.pop()
        this.storage.reloadFilesFromPath(this.historyPath[this.historyPath.length - 1]);
      } else {
        this.fileSelectedLeft = file;
      }
    }
  }
  //* --------------------------------------------------------------------------------------

  clickRight(file: FileObject) {
    // console.log("Se hizo click derecho en el archivo " + file.name)
    this.fileSelected = file;

  }

  listerClickAction(event: { action: ActionsFile; file: FileObject }) {
    if (ActionsFile[event.action] == 'DOWNLOAD') {
      this.storage.downloadFile(event.file.link, event.file.name)
    }
    if (ActionsFile[event.action] == 'GET_LINK') {
      this._clipboard.copy(event.file.link)
      this._snackBar.open("Enlace copiado al portapapeles", "", {duration: 3000});
    }
    if (ActionsFile[event.action] == 'DELETE') {
      this.storage.deleteFile(event.file.link)
    }
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any) {
    const elementRef = (event.target as Element)
    if (elementRef.id === 'main-panel' || elementRef.className === 'ng-star-inserted') {
      this.fileSelectedLeft = undefined
    }
  }
}
