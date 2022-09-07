import {Component, HostListener, OnInit} from '@angular/core';
import {FileObject} from "../models/FileObject";
import {ActionsFile} from "../models/ActionsFile";
import {StorageService} from "../../services/storage.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateOrUploadComponent} from "../dialog-create-or-upload/dialog-create-or-upload.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";
import {FileType} from "../models/FileType";
import {DialogAddFileComponent} from "../dialog-add-file/dialog-add-file.component";
import {DialogAddFolderComponent} from "../dialog-add-folder/dialog-add-folder.component";

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
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _clipboard: Clipboard,
  ) {
    // * add listener for change files for current directory
    this.listFiles = storage.listFilesInFolder
  }

  ngOnInit(): void {
  }

  openDialogCreate(): void {
    const dialogCreateRef = this.dialog.open(DialogCreateOrUploadComponent, {
      width: '250px',
    });

    dialogCreateRef.afterClosed().subscribe(result => {
      switch (result) {
        case FileType.FILE:
          this.openDialogAddFile()
          break;
        case FileType.FOLDER:
          this.openDialogAddFolder();
          break;
      }
    });
  }

  openDialogAddFolder(): void {
    const dialogNameFolderRef = this.dialog.open(DialogAddFolderComponent, {
      width: '350px',

    });

    dialogNameFolderRef.afterClosed().subscribe(async result => {
      console.log(result)
      if (result) {
        await this.storage.createDir(result)
      }
    })
  }

  openDialogAddFile() {
    // * this dialog close automatically
    this.dialog.open(DialogAddFileComponent, {
      width: '550px',
      height: '450px',
    });
  }


  //* Si regresa a commits anteriores guarde este framento de codigo ya que existia un bug
  clickLeft(file: FileObject) {
    if (file.type === FileType.FOLDER) {
      if (this.fileSelected === file) {
        this.storage.reloadFilesFromPath(file.link);
      } else {
        this.fileSelected = file;
      }
    } else {
      this.fileSelected = file;
    }
  }

  clickRight(file: FileObject) {
    // console.log("Se hizo click derecho en el archivo " + file.name)
    this.fileSelected = file;

  }

  async listerClickAction(event: { action: ActionsFile; file: FileObject }) {
    const {action, file} = event
    switch (action) {
      case ActionsFile.DELETE:
        await this.storage.deleteFile(file.link)
        this.showToast("Elemento eliminado")
        break;
      case ActionsFile.RENAME:
        break;
      case ActionsFile.DOWNLOAD:
        this.showDialogDownload(file)
        break;
      case ActionsFile.GET_LINK:
        this._clipboard.copy(event.file.link)
        this.showToast("Enlace copiado al portapapeles")
        break;
    }
  }

  showDialogDownload(file: FileObject) {
    this.dialog.open(ProgressBarComponent, {
      width: '350px',
      disableClose: true,
      data: {type: 'DOWNLOAD'}
    });

    this.storage.downloadFile(file.link, file.name)
  }

  showToast(message: string) {
    this._snackBar.open(message, "", {duration: 3000});
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any) {
    const elementRef = (event.target as Element)
    if (elementRef.id === 'main-panel' || elementRef.className === 'ng-star-inserted') {
      this.fileSelected = undefined
    }
  }
}
