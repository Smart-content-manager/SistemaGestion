import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {StorageService} from '../../services/storage.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-dir',
  templateUrl: './create-dir.component.html',
  styleUrls: ['./create-dir.component.css']
})
export class CreateDirComponent implements OnInit {
  dirForm = this.fb.group({
    dirName: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    public dialogRef: MatDialogRef<CreateDirComponent>
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.debug(this.dirForm.value.dirName!)
    this.storage.createDir(this.dirForm.value.dirName!)
    this.dialogRef.close()
  }
}
