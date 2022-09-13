import { getDownloadURL, ListResult, StorageReference } from "@angular/fire/storage";
import { faFile, faFolder, IconDefinition, faFilm, faImage, faFileWord, faFilePowerpoint, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FileType } from "./FileType";
import { filter } from "rxjs";

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
    icon: faFolder,
    extension: undefined
  }
}

async function storageRefToFile(reference: StorageReference) {
  console.log(reference);

  let filesUrl = await getDownloadURL(reference)
  return <FileObject>{
    name: reference.name,
    type: FileType.FILE,
    link: filesUrl,
    icon: getIconFile(reference.name)
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
  const listFiles = await Promise.all(response.items.map(item => storageRefToFile(item)));
  const listFileFilter = listFiles.filter(item => item.name != ".sgkeep")


  const folderBefore = storageRefToBeforeFolder(currentPath);

  if (folderBefore != null) {
    return [folderBefore, ...listFolders, ...listFileFilter]
  } else {
    return [...listFolders, ...listFileFilter]
  }

}

function getFileExtension(filename: string) {
  return filename.split('.').pop();
}

function getIconFile(filename: string) {
  let extencion = getFileExtension(filename)
  const video = ["mp4", "mov", "wmv", "avi", "avchd", "flv", "f4v", "swf", "mkv", "webm"]
  const imagen = ["bmp", "gif", "jpg", "tif", "png"]
  const word = ["Doc", "Docx", "Docm", "Dot"]
  const excel = [
    "xlsx",
    "xlsm",
    "xlsb",
    "xltx",
    "xltm",
    "xls",
    "xlt",
    "xml",
    "xlam",
    "xla",
    "xlw",
    "xlr"
  ]


  return video.includes(extencion!) ? faFilm : imagen.includes(extencion!) ? faImage : word.includes(extencion!) ? faFileWord : excel.includes(extencion!) ? faFileExcel : faFile
}

