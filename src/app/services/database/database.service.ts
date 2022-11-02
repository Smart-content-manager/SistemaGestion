import {Injectable} from '@angular/core';
import {collection, collectionData, Firestore,} from '@angular/fire/firestore';
import {FileObject, MapToFileObject} from "../../main-panel/models/FileObject";
import {BehaviorSubject, catchError, map, Observable, switchMap} from "rxjs";

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
          map(listDocument => listDocument.map(doc => MapToFileObject(doc))),
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

}
