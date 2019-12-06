import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private appService: AppService,
    private _userService: UserService
    ) {}
  isCollapsed = true;
  ngOnInit() {
  }

  salir() {
    this._userService.logout();
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
