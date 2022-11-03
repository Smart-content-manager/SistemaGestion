import {Injectable} from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc} from '@angular/fire/firestore';
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
    private afs: Firestore
  ) {

    this.listFiles = this.currentPath.pipe(
      switchMap(path => {
        return collectionData(collection(this.afs, `${path}/files`), {idField: "id"}).pipe(
          map(listDocument =>
            listDocument.map(doc => MapToFileObject(doc))
              .sort((doc1, doc2) => doc2.type.valueOf() - doc1.type.valueOf())),
          tap(list => this.listCurrent = list.filter(item => item.type === FileType.FOLDER)),
          catchError((error: any) => {
            console.log(`error get list files: ${error}`)
            return []
          })
        )
      }),
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

    this._isLoadingFiles.next(true);

    if (this.showPath.value != "") {
      this.showPath.next(this.showPath.value + "/" + folder.name)
    } else {
      this.showPath.next(folder.name)
    }
    this.currentPath.next(folder.link);

    this._isLoadingFiles.next(false);
  }

  backDirectory() {

    this._isLoadingFiles.next(true);

    const listPath = this.currentPath.value.split("/files/")
    listPath.pop()
    const newPath = listPath.join("/files/")
    console.log(`new path: ${newPath}`)
    this.currentPath.next(newPath)


    const listFiles = this.showPath.value.split("/")
    listFiles.pop()
    this.showPath.next(listFiles.join("/"))

    this._isLoadingFiles.next(false);

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
    const newDoc = doc(this.afs, `${this.currentPath.value}/files`, idFolder)
    await setDoc(newDoc, objectFolder)
  }

  async createNewFile(nameFile: string, linkFile: string) {
    const idFile = uuidv4()
    const objectFolder = FileObjectToMap(
      <FileObject>{
        name: nameFile,
        type: FileType.FILE,
        link: linkFile
      }
    )
    const newDoc = doc(this.afs, `${this.currentPath.value}/files`, idFile)
    await setDoc(newDoc, objectFolder)
  }

}
