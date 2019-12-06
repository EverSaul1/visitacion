import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VisitorGuard implements CanActivate {
  constructor(
    public _usuarioService: UserService
  ) {}

  canActivate() {
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE' || this._usuarioService.usuario.role === 'VISITOR_ROLE' ) {
      return true;
    } else {
      console.log('Bloqueado por el USER GUARD');
      return false;
    }
  }
  
}
