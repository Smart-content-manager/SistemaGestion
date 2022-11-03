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

  async uploadFile(fileId: string, file: any) {
    const fileRef = ref(this.storage, fileId);
    let linkFile = ""
    try {
      // * set init state in progress state
      this.progressState.setInitialState()

      // * create upload task
      const taskUpload = uploadBytesResumable(fileRef, file)

      // * adding listener for progress
      taskUpload.on('state_changed', async (snapshot) => {
        const progress = +((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
        this.progressState.setProgress(progress)
      })

      // ? await finish task
      const result = await taskUpload

      // * get url to download download
      linkFile = await getDownloadURL(result.ref)

      // * set finish state
      this.progressState.setSuccess()
    } catch (e) {
      console.log(`error uploading file: ${file} ${e}`)
    } finally {

      // * restore init state
      this.progressState.setInitialState()

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

  async deleteFile(fileId: string) {
    const fileRef = ref(this.storage, fileId);
    try {
      await deleteObject(fileRef)
    } catch (e) {
      console.log(`Error deleting file: ${e}`)
    }
  }

}
