import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export const enum ActionsFile {
  DELETE, RENAME, DOWNLOAD, GET_LINK, PROPERTY
}

export interface ItemActionFile {
  name: string,
  action: ActionsFile,
  iconAction: IconDefinition
}
