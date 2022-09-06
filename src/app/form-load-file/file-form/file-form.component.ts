import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {StorageService} from 'src/app/services/storage.service';
import {ProgressBarComponent} from '../../main-panel/progress-bar/progress-bar.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';


@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {
  fileForm = this.fb.group({
    fileName: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private serviceS: StorageService,
    private dialog: MatDialog,
    private router: Router,
    private storage: StorageService,
  ) {
  }

  file: any

  ngOnInit(): void {
  }

  getFile(event: any) {
    this.file = event.target.files[0]
  }

  async onSubmit() {
    this.dialog.open(ProgressBarComponent, {
      width: '250px',
      disableClose: true,
      data: {type: 'UPLOAD'}
    });
    await this.serviceS.uploadFile(this.file, this.fileForm.value.fileName)

  }

}
