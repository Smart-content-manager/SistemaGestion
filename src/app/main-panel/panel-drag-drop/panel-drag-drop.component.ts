import {Component, OnInit} from '@angular/core';
import {FileObject, FileType} from "../models/FileObject";
import {ActionsFile} from "./ActionsFile";
import {StorageService} from "../../services/storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-panel-drag-drop',
  templateUrl: './panel-drag-drop.component.html',
  styleUrls: ['./panel-drag-drop.component.css']
})
export class PanelDragDropComponent implements OnInit {


  fileSelected: FileObject | null = null
  listFiles: Observable<FileObject[]>

  constructor(
    private storage: StorageService
  ) {
    this.listFiles = storage.listFilesInFolder
  }

  ngOnInit(): void {
  }

  clickLeft(file: FileObject) {
    // console.log("Se hizo click izquierdo en angulael archivo " + file.name)
    if (this.fileSelected == file) {
      if(file.type == FileType.FOLDER){
        console.log(`dir = ${file.link}`)
        this.storage.reloadFilesFromPath(file.link)
      }
    } else {
      this.fileSelected = file;
    }
  }

  clickRight(file: FileObject) {
    // console.log("Se hizo click derecho en el archivo " + file.name)
    this.fileSelected = file;

  }

  listerClickAction(event: { action: ActionsFile; file: FileObject }) {
    console.log(`accion recibida ${ActionsFile[event.action]} en el archivo ${event.file.name}`)
  }
}
