import {Component, HostListener, OnInit} from '@angular/core';
import {FileObject} from "../models/FileObject";
import {ActionsFile} from "../models/ActionsFile";
import {StorageService} from "../../services/storage/storage.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateOrUploadComponent} from "../dialog-create-or-upload/dialog-create-or-upload.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";
import {DialogTaskComponent} from "../dialog-task/dialog-task.component";
import {FileType} from "../models/FileType";
import {DialogAddFileComponent} from "../dialog-add-file/dialog-add-file.component";
import {DialogInputNameData, DialogInputNameItemComponent} from "../dialog-input-name/dialog-input-name-item.component";
import {DatabaseService} from "../../services/database/database.service";

@Component({
  selector: 'app-panel-drag-drop',
  templateUrl: './panel-drag-drop.component.html',
  styleUrls: ['./panel-drag-drop.component.css']
})
export class PanelDragDropComponent implements OnInit {

  type = FileType.FOLDER

  fileSelected: FileObject | undefined;
  listFiles: Observable<FileObject[]>;

  isLoadingFiles: Observable<boolean>;

  constructor(
    private storage: StorageService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _clipboard: Clipboard,
    private database: DatabaseService
  ) {
    // * add listener for change files for current directory
    this.listFiles = database.listFiles;
    this.isLoadingFiles = storage.isLoadingFiles;
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
          this.openDialogGetName(<DialogInputNameData>{
            titleDialog: "Crea una nueva carpeta",
            nameInput: "Nombre de la carpeta",
            hintDialog: "Escribe el nombre de la carpeta",
            maxLengthName: 20,
            iconDialog: "create_new_folder"
          }, async name => {
            // await this.storage.createDir(name)
            await this.database.createNewFolder(name)
          });
          break;
      }
    });
  }

  openDialogGetName(
    dataPassed: DialogInputNameData,
    actionAfterName: (inputName: string) => void
  ): void {
    const dialogNameFolderRef = this.dialog.open(DialogInputNameItemComponent, {
      width: '350px',
      data: dataPassed
    });
    dialogNameFolderRef.afterClosed().subscribe(result => {
      if (result) actionAfterName(result)
    })
  }

  openDialogAddFile() {
    // * this dialog close automatically
    this.dialog.open(DialogAddFileComponent, {
      width: '550px',
      height: '450px',
      disableClose: true,
    });
  }


  // * Si regresa a commits anteriores guarde este framento de codigo ya que existia un bug
  clickLeft(file: FileObject) {
    if (file.type === FileType.FOLDER) {
      if (this.fileSelected === file) {
        this.storage.reloadFilesFromPath(file.link);
        this.database.forwardDirectory(file);
      } else {
        this.fileSelected = file;
      }
    } else {
      this.fileSelected = file;
    }
  }

  clickRight(file: FileObject) {
    this.fileSelected = file;
  }

  async listerClickAction(event: { action: ActionsFile; file: FileObject }) {
    const { action, file } = event
    switch (action) {
      case ActionsFile.DELETE:
        await this.storage.deleteFile(file.link)
        this.showToast("Elemento eliminado")
        this.fileSelected = undefined
        break;
      case ActionsFile.RENAME:
        const nameFileSelected = this.fileSelected?.name
        if (nameFileSelected) this.openDialogGetName(
          <DialogInputNameData>{
            titleDialog: "Renombrar archivo",
            nameInput: "Nombre del archivo",
            hintDialog: "Escribe el nuevo nombre del archivo",
            maxLengthName: 20,
            defaultValue: nameFileSelected,
            iconDialog: "edit"
          },
          async inputName => {
            await this.storage.renameFile(nameFileSelected, inputName)
            this.showToast("Elemento renombrado")
            this.fileSelected = undefined
          }
        );
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
    this.dialog.open(DialogTaskComponent, {
      width: '350px',
      disableClose: true,
      data: { type: 'DOWNLOAD' }
    });

    this.storage.downloadFile(file.link, file.name)
  }

  showToast(message: string) {
    this._snackBar.open(message, "", { duration: 3000 });
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any) {
    const elementRef = (event.target as Element)
    if (elementRef.id === 'main-panel' || elementRef.className === 'ng-star-inserted') {
      this.fileSelected = undefined
    }
  }

  async onFileDropped(listFiles: any[]) {
    const listFinalFiles = [...listFiles]
    this.dialog.open(DialogTaskComponent, {
      width: '250px',
      disableClose: true,
      data: { type: 'UPLOAD' }
    });
    const file = listFinalFiles[0]
    await this.storage.uploadFile(file, file.name)
  }
}
