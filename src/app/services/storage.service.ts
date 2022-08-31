import { Injectable } from '@angular/core';
import { getDownloadURL, listAll, ref, Storage, uploadBytes, ListResult } from "@angular/fire/storage";
import { BehaviorSubject } from "rxjs";
import { FileObject, FileType } from "../main-panel/models/FileObject";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.reloadFilesFromPath(this._currentPath.value);
  }

  private _listFilesInFolder = new BehaviorSubject<FileObject[]>([]);

  get listFilesInFolder() {
    return this._listFilesInFolder.asObservable();
  }

  private _currentPath = new BehaviorSubject<string>('');

  get currentPath() {
    return this._currentPath.asObservable();
  }

  reloadFilesFromPath(path: string) {
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

      let finalListFiles = [...listFolders, ...await Promise.all(listFiles)]

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

}
