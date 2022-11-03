import {BehaviorSubject} from "rxjs";

export enum StateFile {
  INIT, IN_PROGRESS, SUCCESS
}

export interface FilePercent {
  state: StateFile,
  percent: number
}

export class ProgressState {
  private initState = <FilePercent>{
    state: StateFile.INIT,
    percent: 0,
  }
  private _progressState = new BehaviorSubject<FilePercent>(this.initState);

  get progressState() {
    return this._progressState.asObservable();
  }

  setInitialState() {
    this._progressState.next(this.initState);
  }

  setProgress(percent: number) {
    this._progressState.next(<FilePercent>{
      state: StateFile.IN_PROGRESS,
      percent: percent
    })
  }

  setSuccess() {
    this._progressState.next(
      <FilePercent>{
        state: StateFile.SUCCESS,
        percent: 100,
      }
    )
  }
}
