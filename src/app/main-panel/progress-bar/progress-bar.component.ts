import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { StorageService } from "../../services/storage.service";
import { Download } from '../models/downloadInterface';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  _progressBar: Observable<Download>;
  progressBar: Download | any;

  constructor(private storage: StorageService,) {
    this._progressBar = storage.progressBar
  }


  ngOnInit(): void {
    this._progressBar.subscribe((res) => {
      this.progressBar = res
    })

  }

}
