import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-menu-file-options',
  templateUrl: './menu-file-options.component.html',
  styleUrls: ['./menu-file-options.component.css']
})
export class MenuFileOptionsComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
