import {Injectable} from '@angular/core';
import {deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {Clipboard} from '@angular/cdk/clipboard';
import {MatDialog} from "@angular/material/dialog";
import {TaskDownload} from '../../main-panel/models/FilePercent';
import {ProgressState} from "./ProgressState";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private storage: Storage,
  ) {

  }

  private progressState = new ProgressState();

  get progressBar() {
    return this.progressState.progressState
  }

  async uploadFile(currentPath: string, file: any, fileName: string) {
    const fullPathFile = `${currentPath}/files/${fileName}`
    const fileRef = ref(this.storage, fullPathFile);
    let linkFile = ""
    try {
      this.progressState.setInitialState()

      const taskUpload = uploadBytesResumable(fileRef, file)
      taskUpload.on('state_changed', async (snapshot) => {
        const progress = +((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
        console.log(progress)
        this.progressState.setProgress(progress)
      })
      const result = await taskUpload
      linkFile = await getDownloadURL(result.ref)

      this.progressState.setSuccess()
    } catch (e) {
      console.log(`error uploading file: ${file} ${e}`)
    }
    return linkFile

  }

  downloadFile(fileUrl: string, fileName: string) {
    const request = new TaskDownload(
      {
        nameFile: fileName,
        urlFile: fileUrl,
        actionAfter: () => this.progressState.setSuccess(),
        actionBefore: () => this.progressState.setInitialState(),
        actionUpdate: (percent) => this.progressState.setProgress(percent),
        actionError: (error) => console.log(`error downloading file: ${fileName} ${error}`)
      }
    )
    request.startRequest()
  }

  async deleteFile(currentPath: string, fileName: string) {
    const fullPathFile = `${currentPath}/${fileName}`
    const fileRef = ref(this.storage, fullPathFile);
    try {
      await deleteObject(fileRef)
    } catch (e) {
      console.log(e);
    }
  }

}
