import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {LocationStrategy} from "@angular/common";
import {AuthService} from "../../auth/services/auth.service";
import {DatabaseService} from 'src/app/services/database/database.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  currentPath: Observable<string>

  constructor(
    private location: LocationStrategy,
    private authServices: AuthService,
    private database: DatabaseService
  ) {
    this.currentPath = this.database.showPath
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
      if (database.currentShowPath != "") {
        database.backDirectory()
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
