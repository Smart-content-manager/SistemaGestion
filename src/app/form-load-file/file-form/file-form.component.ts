import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { ProgressBarComponent } from '../../main-panel/progress-bar/progress-bar.component';
import { Observable } from 'rxjs';
import { Download } from 'src/app/main-panel/models/downloadInterface';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {
  fileForm = this.fb.group({
    fileName: [null, Validators.required]
  });
  _progressBar: Observable<Download>;
  progressBar: Download | any;

  constructor(
    private fb: FormBuilder,
    private serviceS: StorageService,
    private dialog: MatDialog,
    private router: Router,
    private storage: StorageService,
  ) {
    this._progressBar = storage.progressBar
  }

  file: any

  ngOnInit(): void {
    this._progressBar.subscribe((res) => {
      this.progressBar = res
    })

  }

  getFile(event: any) {
    this.file = event.target.files[0]
  }

  onSubmit(): void {
    this.storage.uploadProgressBar()
    const dialogRef = this.dialog.open(ProgressBarComponent, {
      width: '250px',
      disableClose: true
    });
    this.serviceS.uploadFile(this.file, this.fileForm.value.fileName)
    dialogRef.afterClosed().subscribe(res => {
      this.storage.cleanProgressBar()
    })
    this.router.navigate([""])
  }

}
