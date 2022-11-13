import {Component, Inject, OnInit} from '@angular/core';
import {FileType} from "../../main-panel/models/FileType";
import {FileObject, getIconFileAndColor} from "../../main-panel/models/FileObject";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {getListProperties, Properties} from "../../upload-file/PropertysEncode";

export interface DialogPropertyData {
  fileObject: FileObject
}

@Component({
  selector: 'app-dialog-property',
  templateUrl: './dialog-property.component.html',
  styleUrls: ['./dialog-property.component.css']
})
export class DialogPropertyComponent implements OnInit {

  fileAndColor: { color: string, icon: IconDefinition }
  listProperty: Properties[];
  fileObject: FileObject;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogPropertyData,
    public dialogRef: MatDialogRef<DialogPropertyComponent>,
  ) {
    this.fileAndColor = getIconFileAndColor(data.fileObject.name)
    this.listProperty = this.getListShowProperty(data.fileObject)
    this.fileObject = data.fileObject
  }

  ngOnInit(): void {
  }

  static openDialog(dialog: MatDialog, fileObject: FileObject) {
    dialog.open(DialogPropertyComponent, {
      width: '500px',
      data: {fileObject: fileObject}
    });
  }

  getListShowProperty(fileObject: FileObject) {
    const listProperty = [<Properties>{name: 'Nombre', value: fileObject.name}]
    if (fileObject.type == FileType.FILE) {
      // * add properties general file
      listProperty.push(
        <Properties>{name: 'Autor', value: fileObject.author},
        <Properties>{name: 'Descripcion', value: fileObject.description},
      )
      listProperty.push(...getListProperties(fileObject.propertiesCode))
    }
    return listProperty
  }

}
