import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user:any;
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    if (this._userService.usuario) {
      this.user = this._userService.usuario;
    } else {
      this.user = '';
    }
  }

}
