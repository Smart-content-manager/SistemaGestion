import {Icon} from "@fortawesome/fontawesome-svg-core";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export interface FileObject {
  name: string;
  type:FileType;
  link:string;
  icon:IconDefinition;
}

export enum FileType {
  FILE, FOLDER
}
