import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, ListResult } from '@angular/fire/storage';
import { listAll, getDownloadURL } from '@angular/fire/storage'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  uploadFile(file: any, fileName: null | undefined) {
    if (file) {
      let raiz = fileName ? `raiz/${fileName}.${this.getType(file.name)}` : `raiz/${file.name}`
      const fileRef = ref(this.storage, raiz);
      uploadBytes(fileRef, file)
        .then(response => {
          this.router.navigate([""])
        })
        .catch(error => console.log(error));
    }
  }

  getType(file: string) {
    let extencion = file.split('.').pop()
    return extencion

  }

  listAllFile(): Promise<any> {
    let respuesta: ListResult
    return new Promise((resolve, reject) => {
      const fileRef = ref(this.storage, '');
      listAll(fileRef).then(response => {
        resolve({
          'items': response.items,
          'prefixes': response.prefixes,
          'nextPageToken': response.nextPageToken
        })
      }).catch(error => console.log(error))
    })
  }

}
