import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileObject} from "../models/FileObject";
import {ActionsFile, ItemActionFile} from "../panel-drag-drop/ActionsFile";
import {faDownload, faLink, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-menu-file-options',
  templateUrl: './menu-file-options.component.html',
  styleUrls: ['./menu-file-options.component.css']
})
export class MenuFileOptionsComponent implements OnInit {

  @Input() currentFile: FileObject | undefined;
  @Output() clickOptionEvent = new EventEmitter<{ action: ActionsFile, file: FileObject }>();

  listOptions: ItemActionFile[] = [
    {name: "Remombrar", action: ActionsFile.RENAME, iconAction: faPen},
    {name: "Eliminar", action: ActionsFile.DELETE, iconAction: faTrash},
    {name: "Descargar", action: ActionsFile.DOWNLOAD, iconAction: faDownload},
    {name: "Obtener link", action: ActionsFile.GET_LINK, iconAction: faLink}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  clickOption(selectAction: ItemActionFile): void {
    this.clickOptionEvent.emit({action: selectAction.action, file: this.currentFile!})
  }

}
