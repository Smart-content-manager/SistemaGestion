import {Component, OnInit} from '@angular/core';
import {FileObject} from "../models/FileObject";
import {ActionsFile} from "../models/ActionsFile";
import {StorageService} from "../../services/storage/storage.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";
import {FileType} from "../models/FileType";
import {DatabaseService} from "../../services/database/database.service";
import {DialogTaskComponent, TaskType} from "../../dialogs/dialog-task/dialog-task.component";
import {SelectAddDialogComponent} from "../../dialogs/select-add-dialog/select-add-dialog.component";
import {DialogInputNameComponent, TypeInput} from "../../dialogs/dialog-input-name/dialog-input-name.component";
import {v4 as uuidv4} from "uuid";
import {DialogDropFileComponent} from "../../dialogs/dialog-drop-file/dialog-drop-file.component";

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
    this.isLoadingFiles = database.isLoadingFiles;
  }

  ngOnInit(): void {
  }

  openDialogCreate(): void {
    this.fileSelected = undefined
    const dialogCreateRef = SelectAddDialogComponent.openDialog(this.dialog);

    dialogCreateRef.afterClosed().subscribe(result => {
      switch (result) {
        case FileType.FILE:
          this.openDialogAddFile()
          break;
        case FileType.FOLDER:
          this.openDialogInputName(
            TypeInput.CREATE_FOLDER,
            async (name: string) => {
              console.log(`name (${name})`)
              if (name != "") {
                await this.database.createNewFolder(name)
              }
            }
          )
          break;
      }
    });
  }

  openDialogInputName(
    typeInput: TypeInput,
    actionAfterName: (inputName: string) => void,
    namePassed: string = "",
  ): void {
    const refDialogName = DialogInputNameComponent.openDialog(
      typeInput,
      this.dialog,
      namePassed
    )
    refDialogName.afterClosed().subscribe(async name => {
      if (name != "") actionAfterName(name)
    })
  }

  openDialogAddFile() {
    const refDialog = DialogDropFileComponent.openDialog(this.dialog)
    refDialog.afterClosed().subscribe(file => {
      if (file != null) {

      }
    })
  }

  clickLeft(file: FileObject) {
    if (file.type === FileType.FOLDER) {
      if (this.fileSelected === file) {
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
        await this.database.deleteFile(file.id)
        await this.storage.deleteFile(file.id)
        this.showToast("Elemento eliminado")
        this.fileSelected = undefined
        break;
      case ActionsFile.RENAME:
        const nameFileSelected = this.fileSelected?.name
        if (nameFileSelected) {
          this.openDialogInputName(
            TypeInput.RENAME_FILE,
            async (name: string) => {
              await this.database.updateName(name, file.id)
              this.showToast("Elemento renombrado")
              this.fileSelected = undefined
            },
            file.name
          )
        }
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
    DialogTaskComponent.openDialog(this.dialog, TaskType.DOWNLOAD)
    this.storage.downloadFile(file.link, file.name)
  }

  showToast(message: string) {
    this._snackBar.open(message, "", { duration: 3000 });
  }


  documentClick(event: any) {
    const elementRef = (event.target as Element)
    if (elementRef.id === 'main-panel' || elementRef.className === 'ng-star-inserted') {
      this.fileSelected = undefined
    }
  }

  async onFileDropped(listFiles: any[]) {
    const listFinalFiles = [...listFiles]
    DialogTaskComponent.openDialog(this.dialog, TaskType.UPLOAD)
    const file = listFinalFiles[0]
    const idFile = uuidv4()
    const linkFile = await this.storage.uploadFile(idFile, file)
    await this.database.createNewFile(file.name, idFile, linkFile)
  }
}
