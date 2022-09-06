import {getDownloadURL, ListResult, StorageReference} from "@angular/fire/storage";
import {faFile, faFolder, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FileType} from "./FileType";

export interface FileObject {
  name: string;
  type: FileType;
  link: any;
  icon: IconDefinition;
}

function storageRefToFolder(reference: StorageReference) {
  return <FileObject>{
    name: reference.name,
    type: FileType.FOLDER,
    link: reference.fullPath,
    icon: faFolder
  }
}

async function storageRefToFile(reference: StorageReference) {
  let filesUrl = await getDownloadURL(reference)
  return <FileObject>{
    name: reference.name,
    type: FileType.FILE,
    link: filesUrl,
    icon: faFile
  }
}

function storageRefToBeforeFolder(path: string): FileObject | null {
  const listPath = path.split("/")
  listPath.pop()
  const beforePath = listPath.join("/")
  if (path != "") {
    return <FileObject>{
      name: "../",
      type: FileType.FOLDER,
      link: beforePath,
      icon: faFolder
    }
  } else {
    return null
  }
}

export async function getFilesAndFolders(
  currentPath: string,
  response: ListResult
): Promise<FileObject[]> {
  const listFolders = response.prefixes.map(prefix => storageRefToFolder(prefix));
  const listFiles = response.items.map(item => storageRefToFile(item));
  const folderBefore = storageRefToBeforeFolder(currentPath);

  if (folderBefore != null) {
    return [folderBefore, ...listFolders, ...await Promise.all(listFiles)]
  } else {
    return [...listFolders, ...await Promise.all(listFiles)]
  }
}

