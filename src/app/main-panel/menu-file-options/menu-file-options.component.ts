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

  // * get the file for show the correct options
  @Input() currentFile: FileObject | undefined;
  // * emit event when the option is selected
  @Output() clickOptionEvent = new EventEmitter<{ action: ActionsFile, file: FileObject }>();

  // * show all options with icon and text
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

  // * when select option emits this action
  clickOption(selectAction: ItemActionFile): void {
    this.clickOptionEvent.emit({action: selectAction.action, file: this.currentFile!})
  }

}
