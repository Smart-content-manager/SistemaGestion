import { Component, OnInit } from '@angular/core';
import { FileObject, FileType } from "../models/FileObject";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { ActionsFile } from "./ActionsFile";
import { ServiceService } from 'src/app/services/service.service';
import { getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-panel-drag-drop',
  templateUrl: './panel-drag-drop.component.html',
  styleUrls: ['./panel-drag-drop.component.css']
})
export class PanelDragDropComponent implements OnInit {

  listFiles: FileObject[] = []

  fileSelected: FileObject | null = null

  constructor(private serviceS: ServiceService) {
  }

  ngOnInit(): void {
    // ! Falta implementar el sistema de cache
    this.serviceS.listAllFile().then(response => {
      response.prefixes.forEach((prefix: any) => {
        this.listFiles.push(
          {
            'name': prefix.name,
            'type': FileType.FOLDER,
            'link': "",
            'icon': faFolder
          }
        )
      });
      response.items.forEach((item: any) => {
        let fileUrl = getDownloadURL(item)
        this.listFiles.push(
          {
            'name': item.name,
            'type': FileType.FOLDER,
            'link': fileUrl,
            'icon': faFile
          }
        )
      });
      if (response.nextPageToken != undefined) {
        response.nextPageToken.forEach((token: any) => {
          console.log(token);
        });
      }
    })
  }

  clickLeft(file: FileObject) {
    // console.log("Se hizo click izquierdo en angulael archivo " + file.name)
    this.fileSelected = file;
  }

  clickRight(file: FileObject) {
    // console.log("Se hizo click derecho en el archivo " + file.name)
    this.fileSelected = file;
  }

  listerClickAction(event: { action: ActionsFile; file: FileObject }) {
    console.log(`accion recibida ${ActionsFile[event.action]} en el archivo ${event.file.name}`)
  }
}
