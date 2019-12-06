import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  username: string;
  cargando: boolean;

  constructor(
    private _userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {

    this.username = localStorage.getItem('username') || '';
    if ( this.username.length > 1 ) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    this.cargando = true;
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario( forma.value.username , forma.value.password);
    this._userService.login(usuario, forma.value.recuerdame)
      .subscribe( resp => {
        this.cargando = false;
      }),throwError(err => {
        this.cargando = false;
      });
  }


}
