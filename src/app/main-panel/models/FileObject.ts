import {getDownloadURL, ListResult, StorageReference} from "@angular/fire/storage";
import {
  faFile,
  faFileExcel,
  faFileWord,
  faFilm,
  faFolder,
  faImage,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {DocumentData} from "@angular/fire/firestore";
import {FileType, FileTypeFile, FileTypeFolder} from "./FileType";

export interface FileObject {
  name: string;
  type: FileType;
  link: any;
  icon: IconDefinition;
  color: string;
  id: string;
}

export function FileObjectToMap(object: FileObject) {
  const typeEnum = object.type == FileType.FILE ? FileTypeFile : FileTypeFolder
  return {
    name: object.name,
    type: typeEnum,
    link: object.link,
  }
}

export function MapToFileObject(map: DocumentData) {
  const typeEnum = map["type"] == FileTypeFile ? FileType.FILE : FileType.FOLDER

  const {icon, color} = typeEnum == FileType.FILE ? getIconFileAndColor(map["name"]) : {
    icon: faFolder,
    color: "#fff176"
  }
  return <FileObject>{
    name: map["name"],
    type: typeEnum,
    link: map["link"],
    icon: icon,
    color: color,
    id: map["id"],
  }
}


function storageRefToFolder(reference: StorageReference) {
  return <FileObject>{
    name: reference.name,
    type: FileType.FOLDER,
    link: reference.fullPath,
    icon: faFolder,
    color: "#fff176"
  }
}

async function storageRefToFile(reference: StorageReference) {
  let filesUrl = await getDownloadURL(reference)
  let {color, icon} = getIconFileAndColor(reference.name)
  return <FileObject>{
    name: reference.name,
    type: FileType.FILE,
    link: filesUrl,
    icon: icon,
    color: color
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
      icon: faFolder,
      color: "#fff176"
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
  return filename.toLowerCase().split('.').pop();
}

export function getIconFileAndColor(filename: string): { color: string, icon: IconDefinition } {
  let extension = getFileExtension(filename)
  const video = ["mp4", "mov", "wmv", "avi", "avchd", "flv", "f4v", "swf", "mkv", "webm"]
  const image = ["bmp", "gif", "jpg", "tif", "png", "svg"]
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


  if (video.includes(extension!)) {
    return {
      color: "#d32f2f",
      icon: faFilm,
    }
  } else if (image.includes(extension!)) {
    return {
      color: "#d81b60",
      icon: faImage,
    }
  } else if (word.includes(extension!)) {
    return {
      color: "#1565c0",
      icon: faFileWord,
    }
  } else if (excel.includes(extension!)) {
    return {
      color: "#388e3c",
      icon: faFileExcel,
    }
  } else {
    return {
      color: "#607d8b",
      icon: faFile,
    }
  }
}

