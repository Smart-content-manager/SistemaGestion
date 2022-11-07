import {Injectable} from '@angular/core';
import {collection, collectionData, doc, Firestore, runTransaction} from '@angular/fire/firestore';
import {FileObject, FileObjectToMap, MapToFileObject} from "../../main-panel/models/FileObject";
import {BehaviorSubject, catchError, map, Observable, switchMap, tap} from "rxjs";
import {FileType} from "../../main-panel/models/FileType";
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  currentPath = new BehaviorSubject("")
  showPath = new BehaviorSubject("")

  readonly listFiles: Observable<FileObject[]>

  listCurrent: FileObject[] = []

  constructor(
    private firestore: Firestore
  ) {

    this.listFiles = this.currentPath.pipe(
      // * first set state loading
      tap(() => this._isLoadingFiles.next(true)),
      // * convert this path in a collection data, this for listener all changes
      switchMap(path =>
        collectionData(collection(this.firestore, `${path}/files`), {idField: "id"}).pipe(
          // * mapper this collection of map un FileObject
          map(listDocument =>
            listDocument.map(doc => MapToFileObject(doc))
              // * before order list files. First folders and after files
              .sort((doc1, doc2) => doc2.type.valueOf() - doc1.type.valueOf())),
          // * save one copy of list of files
          tap(list => this.listCurrent = list),
          // * in case of error, send empty list
          catchError((error: any) => {
            console.error(`error get list files: ${error}`)
            return []
          }),
          // * for last, change state is loading
          tap(() => this._isLoadingFiles.next(false)),
        )),
    )
  }

  private _isLoadingFiles = new BehaviorSubject(false);

  get isLoadingFiles() {
    return this._isLoadingFiles.asObservable();
  }

  get currentShowPath() {
    return this.showPath.value
  }

  forwardDirectory(folder: FileObject) {

    if (this.showPath.value != "") {
      this.showPath.next(this.showPath.value + "/" + folder.name)
    } else {
      this.showPath.next(folder.name)
    }
    this.currentPath.next(folder.link);
  }

  backDirectory() {


    const listPath = this.currentPath.value.split("/files/")
    listPath.pop()
    const newPath = listPath.join("/files/")
    console.log(`new path: ${newPath}`)
    this.currentPath.next(newPath)


    const listFiles = this.showPath.value.split("/")
    listFiles.pop()
    this.showPath.next(listFiles.join("/"))

  }

  async createNewFolder(nameFolder: string) {
    const idFolder = uuidv4()
    const objectFolder = FileObjectToMap(
      <FileObject>{
        name: nameFolder,
        type: FileType.FOLDER,
        link: `${this.currentPath.value}/files/${idFolder}`
      }
    )
    const newDoc = doc(this.firestore, `${this.currentPath.value}/files`, idFolder)
    await runTransaction(this.firestore,
      async (transaction) => transaction.set(newDoc, objectFolder))
  }

  async createNewFile(fileObject: FileObject) {
    const objectFolder = FileObjectToMap(fileObject)
    const newDoc = doc(this.firestore, `${this.currentPath.value}/files`, fileObject.id)
    await runTransaction(this.firestore,
      async (transaction) => transaction.set(newDoc, objectFolder))
  }

  async updateName(name: string, idFile: string) {
    const document = doc(this.firestore, `${this.currentPath.value}/files/${idFile}`)
    await runTransaction(this.firestore,
      async (transaction) => transaction.update(document, {name: name}))
  }

  async deleteFile(idFile: string) {
    const document = doc(this.firestore, `${this.currentPath.value}/files/${idFile}`)
    await runTransaction(this.firestore,
      async (transaction) => transaction.delete(document))
  }
}
