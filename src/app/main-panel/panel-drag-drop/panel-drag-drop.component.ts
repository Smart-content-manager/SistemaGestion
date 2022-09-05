import { Component, HostListener, OnInit } from '@angular/core';
import { FileObject, FileType } from '../models/FileObject';
import { ActionsFile } from "./ActionsFile";
import { StorageService } from "../../services/storage.service";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DialogCreateOrUploadComponent } from "../dialog-create-or-upload/dialog-create-or-upload.component";
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { Download } from '../models/downloadInterface';
import { Router } from '@angular/router';
import { FileFormComponent } from 'src/app/form-load-file/file-form/file-form.component';
import { CreateDirComponent } from 'src/app/form-load-file/create-dir/create-dir.component';


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
  _progressBar: Observable<Download>;
  progressBar: Download | any;
  typeFolder = FileType.FOLDER
  typeFile = FileType.FILE

  constructor(
    private storage: StorageService,
    private dialog: MatDialog,
    private router: Router
  ) {
    // * add listener for change files for current directory
    this.listFiles = storage.listFilesInFolder,
      this._progressBar = storage.progressBar

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateOrUploadComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case FileType.FILE:
          //!this.router.navigate(["add-file"])
          const dialogAddFile = this.dialog.open(FileFormComponent, {
          });
          break;
        case FileType.FOLDER:
          const dialogDirFile = this.dialog.open(CreateDirComponent, {
          });
          break;
        default:
          console.log("No se selecciono una opcion valida")
      }
    });
  }

  ngOnInit(): void {
    this.historyPath = [""]
    this.storage.reloadFilesFromPath(this.historyPath[this.historyPath.length - 1]);
  }

  //* Si regresa a commits anteriores guarde este framento de codigo ya que existia un bug
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
      const dialogRef = this.dialog.open(ProgressBarComponent, {
        width: '250px',
        height: '170px',
        disableClose: true
      });

      this.storage.downloadFile(event.file.link, event.file.name)
      dialogRef.afterClosed().subscribe(res => {
        this.storage.cleanProgressBar()
      })
    }
    if (ActionsFile[event.action] == 'GET_LINK') {
      this.storage.copyToClipboard(event.file.link)
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
