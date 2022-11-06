import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  currentPath: Observable<string>

  constructor(private storage: StorageService) {
    this.currentPath = this.storage.currentPath
  }

}
