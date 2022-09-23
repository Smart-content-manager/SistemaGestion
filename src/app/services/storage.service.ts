import {Injectable} from '@angular/core';
import {deleteObject, getBlob, listAll, ref, Storage, uploadBytes, uploadBytesResumable} from "@angular/fire/storage";
import {BehaviorSubject} from 'rxjs';
import {FileObject, getFilesAndFolders} from "../main-panel/models/FileObject";
import {Clipboard} from '@angular/cdk/clipboard';
import {MatDialog} from "@angular/material/dialog";
import {FilePercent, StateFile, TaskDownload} from '../main-panel/models/FilePercent';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private init_state = <FilePercent>{
    state: StateFile.INIT,
    percent: 0,
  }

  private _progressBar = new BehaviorSubject<FilePercent>(this.init_state);

  constructor(
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private storage: Storage,
  ) {
    this.reloadFilesFromPath(this._currentPath.value);
  }

  private _listFilesInFolder = new BehaviorSubject<FileObject[]>([]);

  get listFilesInFolder() {
    return this._listFilesInFolder.asObservable();
  }

  get currentListFilesInFolder() {
    return this._listFilesInFolder.value
  }

  private _currentPath = new BehaviorSubject<string>('');

  get currentPath() {
    return this._currentPath.asObservable();
  }

  get currentPathValue() {
    return this._currentPath.value;
  }

  get progressBar() {
    return this._progressBar.asObservable()
  }

  goBackDirectory() {
    let currentPath = this._currentPath.value
    const listPath = currentPath.split("/")
    listPath.pop()
    const beforePath = listPath.join("/")
    this.reloadFilesFromPath(beforePath)
  }

  reloadFilesFromPath(path: string = this._currentPath.value) {
    this._currentPath.next(path);
    const storageRef = ref(this.storage, path);
    listAll(storageRef).then(async (response) => {
      this._listFilesInFolder.next(await getFilesAndFolders(path, response))
    }).catch(() => {
      this._listFilesInFolder.next([])
    });
  }

  async createDir(nameDirectory: string) {
    const file: Blob = new Blob([""], {type: 'text/plain'});
    let refFolder = `${this._currentPath.value}/${nameDirectory}/.sgkeep`
    const dirRef = ref(this.storage, refFolder);
    try {
      await uploadBytes(dirRef, file)
      this.reloadFilesFromPath()
    } catch (error) {
      console.error(error)
    }
  }

  async renameFile(fileName: string, newName: string) {
    const oldRefFile = ref(this.storage, `${this._currentPath.value}/${fileName}`)
    const newRefFile = ref(this.storage, `${this._currentPath.value}/${newName}`)
    try {
      const bytesFile = await getBlob(oldRefFile)
      await uploadBytes(newRefFile, bytesFile)
      await deleteObject(oldRefFile)
      this.reloadFilesFromPath()
    } catch (e) {
      console.error(e)
    }
  }

  async uploadFile(file: any, fileName: string) {
    if (file) {
      const fullPathFile = `${this._currentPath.value}/${fileName}`
      const fileRef = ref(this.storage, fullPathFile);
      try {

        this._progressBar.next(<FilePercent>{
          state: StateFile.INIT,
          percent: 0,
        })

        const taskUpload = uploadBytesResumable(fileRef, file)
        taskUpload.on('state_changed', async (snapshot) => {
          const progress = +((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
          console.log(progress)
          this._progressBar.next(<FilePercent>{
            state: StateFile.IN_PROGRESS,
            percent: progress,
          })
        })

        await taskUpload

        this._progressBar.next(<FilePercent>{
          state: StateFile.SUCCESS,
          percent: 100,
        })

        this.reloadFilesFromPath()

        // * restore init state
        this._progressBar.next(this.init_state);

      } catch (e) {
        console.log(`error uploading file: ${file} ${e}`)
      }
    }
  }

  downloadFile(fileUrl: string, fileName: string) {
    this._progressBar.next({
      state: StateFile.INIT,
      percent: 0
    })

    const request = new TaskDownload(
      {
        nameFile: fileName,
        urlFile: fileUrl,
        actionAfter: () => {
          this._progressBar.next(<FilePercent>{
            state: StateFile.SUCCESS,
            percent: 100
          })
        },
        actionBefore: () => {
          this._progressBar.next(<FilePercent>{
            state: StateFile.INIT,
            percent: 0
          })
        },
        actionError: (error) => {
          console.log(`error downloading file: ${fileName} ${error}`)
        },
        actionUpdate: (percent) => {
          this._progressBar.next(<FilePercent>{
            state: StateFile.IN_PROGRESS,
            percent: percent
          })
        },
      }
    )

    request.startRequest()
  }

  async deleteFile(fileName: string) {
    const fileRef = ref(this.storage, fileName);
    try {
      await deleteObject(fileRef)
    } catch (e) {
      console.log(e);
    } finally {
      this.reloadFilesFromPath()
    }
  }

}
