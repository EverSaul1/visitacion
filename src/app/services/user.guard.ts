import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    public _usuarioService: UserService
  ){}
  canActivate() {
    if (this._usuarioService.usuario.role === 'USER_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por el USER GUARD');
      return false;
    }
  }
  
}
