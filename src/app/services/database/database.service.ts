import {Injectable} from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc} from '@angular/fire/firestore';
import {FileObject, FileObjectToMap, MapToFileObject} from "../../main-panel/models/FileObject";
import {BehaviorSubject, catchError, map, Observable, switchMap} from "rxjs";
import {FileType} from "../../main-panel/models/FileType";
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  currentPath = new BehaviorSubject("")
  showPath = new BehaviorSubject("")

  readonly listFiles: Observable<FileObject[]>

  constructor(
    private afs: Firestore
  ) {

    this.listFiles = this.currentPath.pipe(
      switchMap(path => {
        return collectionData(collection(this.afs, `${path}/files`), {idField: "id"}).pipe(
          map(listDocument =>
            listDocument.map(doc => MapToFileObject(doc))
              .sort((doc1, doc2) => doc2.type.valueOf() - doc1.type.valueOf())),
          catchError((error: any) => {
            console.log(`error get list files: ${error}`)
            return []
          })
        )
      }),
    )
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
    console.log(`id folder ${idFolder}`)
    console.log(`current path: ${this.currentPath.value}`)
    const newDoc = doc(this.afs, `${this.currentPath.value}/files`, idFolder)
    console.log(`new doc: ${newDoc}`)
    await setDoc(newDoc, objectFolder)
  }

}
