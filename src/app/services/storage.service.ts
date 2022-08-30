import {Injectable} from '@angular/core';
import {getDownloadURL, listAll, ref, Storage,} from "@angular/fire/storage";
import {BehaviorSubject} from "rxjs";
import {FileObject, FileType} from "../main-panel/models/FileObject";
import {faFile, faFolder} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
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

}
