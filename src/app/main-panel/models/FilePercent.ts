

export interface TaskListener {
  nameFile: string,
  urlFile: string,
  actionAfter: () => void,
  actionBefore: () => void,
  actionError: (error: any) => void,
  actionUpdate: (percent: number) => void
}


export class TaskDownload {
  request: XMLHttpRequest

  constructor(
    {nameFile, urlFile, actionAfter, actionBefore, actionError, actionUpdate}: TaskListener
  ) {
    this.request = new XMLHttpRequest()
    this.request.responseType = 'blob';
    this.request.open('GET', urlFile);

    this.request.onloadstart = () => actionBefore

    this.request.onload = () => {
      this.downloadFile(nameFile)
      actionAfter()
    }
    this.request.onerror = (event) => actionError(event)

    this.request.onprogress = (event) => {
      const percentLoaded = Math.round((event.loaded / event.total) * 100);
      actionUpdate(percentLoaded)
    }
  }

  startRequest() {
    this.request.send();
  }

  private downloadFile(fileName: string,) {
    const blob = this.request.response;
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.click()
    link.remove();
  }

}
