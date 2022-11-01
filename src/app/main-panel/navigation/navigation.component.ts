import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {StorageService} from "../../services/storage.service";
import {LocationStrategy} from "@angular/common";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  currentPath: Observable<string>

  constructor(
    private storage: StorageService,
    private location: LocationStrategy,
    private authServices: AuthService
  ) {
    this.currentPath = this.storage.currentPath
    // check if back or forward button is pressed.

    this.currentPath.subscribe(path => {
      history.pushState({path: path}, path, window.location.href)
    })

    this.location.onPopState(() => {
      storage.goBackDirectory()
    });
  }

  logOut() {
    try {
      this.authServices.logout()
    } catch (e) {
      console.log("Error logOut")
    }

  }
}
