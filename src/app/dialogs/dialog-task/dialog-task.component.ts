import {Component, Inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {AnimationOptions} from "ngx-lottie";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {Subscription} from "rxjs";
import {StorageService} from "../../services/storage/storage.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StateFile} from "../../services/storage/ProgressState";


export const enum TaskType {
  DOWNLOAD,
  UPLOAD,
}

export interface ProgressData {
  type: TaskType
}


@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent implements OnInit, OnDestroy {

  readonly colorProgressBar: ThemePalette = 'primary';
  readonly animateOptions: AnimationOptions;
  readonly titleTask: string;

  progressBarMode: ProgressBarMode = 'indeterminate';

  percentTask: number;
  subscribePercent: Subscription;

  constructor(
    private ngZone: NgZone,
    private storage: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: ProgressData,
  ) {
    this.percentTask = 0;
    this.titleTask = this.getTitle(data.type);
    this.animateOptions = this.initAnimation(data.type);
    this.subscribePercent = this.subscribePercentWork();
  }

  static openDialog(dialog: MatDialog, taskType: TaskType) {
    return dialog.open(DialogTaskComponent, {
      width: '350px',
      disableClose: true,
      data: <ProgressData>{type: taskType}
    });
  }


  ngOnDestroy(): void {
    this.subscribePercent.unsubscribe()
  }

  ngOnInit = (): void => {
  };

  private getTitle = (type: TaskType):
    string => type == TaskType.DOWNLOAD ? "Download" : "Upload";

  private initAnimation = (type: TaskType) =>
    (type == TaskType.DOWNLOAD) ? {path: "/assets/download-from-cloud.json"} : {path: "/assets/upload-to-cloud.json"};

  private subscribePercentWork() {
    return this.storage.progressBar.subscribe(async (filePercent) => {
      this.ngZone.run(() => {
        switch (filePercent.state) {
          case StateFile.INIT:
            this.percentTask = 0;
            this.progressBarMode = 'indeterminate';
            break;
          case StateFile.IN_PROGRESS:
            this.progressBarMode = 'determinate';
            this.percentTask = filePercent.percent;
            break;
          case StateFile.SUCCESS:
            this.percentTask = 100;
            this.progressBarMode = 'indeterminate';
            break;
        }
      })

    })
  }


}
