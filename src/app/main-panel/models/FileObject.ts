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
  link: any;
  id: string;
  name: string;
  color: string;
  type: FileType;
  icon: IconDefinition;
  author: string,
  description: string,
  colorFile: string,
  soundFile: string,
  dateCreate: string,
}

export function FileObjectToMap(object: FileObject) {
  const typeEnum = object.type == FileType.FILE ? FileTypeFile : FileTypeFolder
  return {
    type: typeEnum,
    name: object.name,
    link: object.link,
    author: object.author,
    description: object.description,
    colorFile: object.colorFile,
    soundFile: object.soundFile,
    dateCreate: object.dateCreate,
  }
}

export function MapToFileObject(map: DocumentData) {
  const typeEnum = map["type"] == FileTypeFile ? FileType.FILE : FileType.FOLDER

  const {icon, color} = typeEnum == FileType.FILE ? getIconFileAndColor(map["name"]) : {
    icon: faFolder,
    color: "#fff176"
  }
  return <FileObject>{
    icon: icon,
    color: color,
    type: typeEnum,
    id: map["id"],
    name: map["name"],
    link: map["link"],
    author: map["author"],
    description: map["description"],
    colorFile: map["colorFile"],
    soundFile: map["soundFile"],
    dateCreate: map["dateCreate"],
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

