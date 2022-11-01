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
      if (path == "") {
        history.replaceState({path: path}, path)
      } else {
        if (path.length > history.state.path.length) {
          history.pushState({path: path}, path)
        }
      }
    })


    this.location.onPopState((event) => {
      if (storage.getCurrentPathValue() != "") {
        storage.goBackDirectory()
      }
    });

  }

  async logOut() {
    try {
      await this.authServices.logout()
    } catch (e) {
      console.log("Error logOut")
    }

  }
}
