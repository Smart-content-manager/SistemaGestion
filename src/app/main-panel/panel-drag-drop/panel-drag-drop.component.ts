import {Component, OnInit} from '@angular/core';
import {FileObject, FileType} from "../models/FileType";
import {faFile, faFolder} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-panel-drag-drop',
  templateUrl: './panel-drag-drop.component.html',
  styleUrls: ['./panel-drag-drop.component.css']
})
export class PanelDragDropComponent implements OnInit {

  listFiles: FileObject[] = [
    {name: "folder1", type: FileType.FOLDER, link: "", icon: faFolder},
    {name: "folder2", type: FileType.FOLDER, link: "", icon: faFolder},
    {name: "folder3", type: FileType.FOLDER, link: "", icon: faFolder},
    {name: "folder4", type: FileType.FOLDER, link: "", icon: faFolder},
    {name: "foto.jpg", type: FileType.FILE, link: "", icon: faFile},
    {name: "archivo.png", type: FileType.FILE, link: "", icon: faFile},
    {name: "archivo2.pdf", type: FileType.FILE, link: "", icon: faFile},
    {name: "archivo3.docx", type: FileType.FILE, link: "", icon: faFile},
  ]

  fileSelected: FileObject | null = null

  constructor() {
  }

  ngOnInit(): void {
  }

  clickLeft(file: FileObject) {
    console.log("Se hizo click izquierdo en angulael archivo " + file.name)
    this.fileSelected=file;
  }

  clickRight(file: FileObject) {
    console.log("Se hizo click derecho en el archivo " + file.name)
    this.fileSelected=file;
  }
}
