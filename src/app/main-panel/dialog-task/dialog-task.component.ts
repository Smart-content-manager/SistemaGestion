import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StorageService} from "../../services/storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ThemePalette} from "@angular/material/core";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {StateFile} from "../models/FilePercent";
import {AnimationOptions} from "ngx-lottie";

export interface ProgressData {
  type: "DOWNLOAD" | "UPLOAD"
}

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent implements OnInit, OnDestroy {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'indeterminate';
  value = 0;
  subscribePercent: Subscription | undefined
  options: AnimationOptions | undefined

  constructor(
    private storage: StorageService,
    private dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProgressData,
  ) {
    this.initAnimation()
    this.subscribePercentWork()
  }

  ngOnDestroy(): void {
    this.subscribePercent?.unsubscribe()
  }

  ngOnInit(): void {
  }

  private initAnimation() {
    if (this.data.type == "DOWNLOAD") {
      this.options = {path: "/assets/download-from-cloud.json"}
    } else {
      this.options = {path: "/assets/upload-to-cloud.json"}
    }
  }

  private subscribePercentWork() {
    this.subscribePercent = this.storage.progressBar.subscribe(async (filePercent) => {
      switch (filePercent.state) {
        case StateFile.INIT:
          this.value = 0;
          this.mode = 'indeterminate';
          break;
        case StateFile.IN_PROGRESS:
          this.mode = 'determinate';
          this.value = filePercent.percent;
          break;
        case StateFile.SUCCESS:
          this.value = 100;
          this.mode = 'indeterminate';

          await new Promise(f => setTimeout(f, 500));
          this.dialogRef.close()

          break;
      }
    })
  }

}
