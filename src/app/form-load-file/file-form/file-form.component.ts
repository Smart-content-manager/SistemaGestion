import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent {
  fileForm = this.fb.group({
    fileName: [null, Validators.required]
  });


  constructor(
    private fb: FormBuilder,
    private serviceS: StorageService
  ) { }

  file: any

  getFile(event: any) {
    this.file = event.target.files[0]
  }

  onSubmit(): void {
    this.serviceS.uploadFile(this.file, this.fileForm.value.fileName)
  }

}
