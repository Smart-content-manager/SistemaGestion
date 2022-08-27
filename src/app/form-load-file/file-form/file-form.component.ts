import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent {
  fileForm = this.fb.group({
    fileName: [null, Validators.required]
  });


  constructor(private fb: FormBuilder, private storage: Storage) { }

  file: any

  getFile(event: any) {
    this.file = event.target.files[0]
  }

  onSubmit(): void {
    if (this.file) {
      let raiz = this.fileForm.value.fileName ? `raiz/${this.fileForm.value.fileName}.${this.getType(this.file.name)}` : `raiz/${this.file.name}`
      const fileRef = ref(this.storage, raiz);
      uploadBytes(fileRef, this.file)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error));
    }
  }

  getType(file: string) {
    let extencion = file.split('.').pop()
    return extencion

  }
}
