import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export enum ActionsFile {
  DELETE, RENAME, DOWNLOAD, GET_LINK
}

export interface ItemActionFile {
  name: string,
  action: ActionsFile,
  iconAction: IconDefinition
}
