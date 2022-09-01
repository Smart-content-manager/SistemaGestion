import { Injectable } from '@angular/core';
import { getDownloadURL, listAll, ref, Storage, uploadBytes, ListResult, getStorage, getBytes, deleteObject } from "@angular/fire/storage";
import { BehaviorSubject } from "rxjs";
import { FileObject, FileType } from "../main-panel/models/FileObject";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from "@angular/material/dialog";
import { DialogClipboardComponent } from '../main-panel/dialog-clipboard/dialog-clipboard.component';
import { DialogDeleteComponent } from '../main-panel/dialog-delete/dialog-delete.component';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private storage: Storage,
    private router: Router
  ) {
    this.reloadFilesFromPath(this._currentPath.value, this._currectFolder);
  }

  private _listFilesInFolder = new BehaviorSubject<FileObject[]>([]);

  get listFilesInFolder() {
    return this._listFilesInFolder.asObservable();
  }

  private _currentPath = new BehaviorSubject<string>('');
  private _currectFolder: string = ''

  get currentPath() {
    return this._currentPath.asObservable();
  }

  reloadFilesFromPath(path: string, currentFolder: string) {
    console.log();

    let finalListFiles: FileObject[]
    this._currentPath.next(path);
    const storageRef = ref(this.storage, path);
    listAll(storageRef).then(async (response) => {

      let listFolders = response.prefixes.map(prefix => {
        return <FileObject>{
          name: prefix.name,
          type: FileType.FOLDER,
          link: prefix.fullPath,
          icon: faFolder
        }
      })

      let listFiles = response.items.map(async prefix => {
        let filesUrl = await getDownloadURL(prefix)
        return <FileObject>{
          name: prefix.name,
          type: FileType.FILE,
          link: filesUrl,
          icon: faFile
        }
      })

      if (path != "") {
        finalListFiles = [{
          name: "../",
          type: FileType.FOLDER,
          link: currentFolder,
          icon: faFolder
        }, ...listFolders, ...await Promise.all(listFiles)]
      }
      else {
        finalListFiles = [...listFolders, ...await Promise.all(listFiles)]
      }
      console.log(finalListFiles);


      this._listFilesInFolder.next(finalListFiles)
    }).catch(() => {
      this._listFilesInFolder.next([])
    });
  }

  uploadFile(file: any, fileName: null | undefined) {
    if (file) {
      let raiz = fileName ? `raiz/${fileName}.${this.getType(file.name)}` : `raiz/${file.name}`
      const fileRef = ref(this.storage, raiz);
      uploadBytes(fileRef, file)
        .then(response => {
          this.router.navigate([""])
        })
        .catch(error => console.log(error));
    }
  }

  getType(file: string) {
    let extencion = file.split('.').pop()
    return extencion

  }

  listAllFile(): Promise<any> {
    let respuesta: ListResult
    return new Promise((resolve, reject) => {
      const fileRef = ref(this.storage, '');
      listAll(fileRef).then(response => {
        resolve({
          'items': response.items,
          'prefixes': response.prefixes,
          'nextPageToken': response.nextPageToken
        })
      }).catch(error => console.log(error))
    })
  }

  downloadFile(fileUrl: any, fileName: any) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      link.click()
    };
    xhr.open('GET', fileUrl);
    xhr.send();



  }

  copyToClipboard(fileLink: string): void {
    this.clipboard.copy(fileLink);
    const dialogRef = this.dialog.open(DialogClipboardComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe();
  }

  deleteFile(fileName: string) {
    const fileRef = ref(this.storage, fileName);
    deleteObject(fileRef).then(() => {
      const dialogRef = this.dialog.open(DialogDeleteComponent, {
        width: '250px',
      });
      dialogRef.afterClosed().subscribe();
      this.router.navigate([""])
    }).catch((error) => {
      console.log(error);

    });
  }

}
