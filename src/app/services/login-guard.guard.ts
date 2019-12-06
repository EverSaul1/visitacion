import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UserService,
    private router: Router
    ) {

  }
  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      console.log('PASO EL GUARD');
      // this._usuarioService.cargarUser();
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('BLOQUEADO POR GUARD');
      return false;
    }
  }
}
