import {Component, Inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StorageService} from "../../services/storage/storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ThemePalette} from "@angular/material/core";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {AnimationOptions} from "ngx-lottie";
import {StateFile} from "../../services/storage/ProgressState";

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
    private ngZone: NgZone
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
      this.ngZone.run(() => {
        switch (filePercent.state) {
          case StateFile.INIT:
            this.value = 0;
            this.mode = 'indeterminate';
            break;
          case StateFile.IN_PROGRESS:
            console.log("progress " + filePercent.percent)
            this.mode = 'determinate';
            this.value = filePercent.percent;
            break;
          case StateFile.SUCCESS:
            this.value = 100;
            this.mode = 'indeterminate';

            this.dialogRef.close()

            break;
        }
      })

    })
  }

}
