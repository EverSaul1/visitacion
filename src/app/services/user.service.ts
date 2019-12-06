import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/internal/operators/map';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuario: any;
  token: any;

  constructor(
    private http: HttpClient,
    public toastService: ToastService,
    public router: Router
  ) {
    this.cargarStorage();
   }

    estaLogueado() {
      return (this.token.length > 5) ? true: false;
    }

    cargarStorage() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        let payload = JSON.parse(atob(this.token.split('.')[1]));
        this.usuario = payload.user;
      } else {
        this.token = '';
      }
    }

    showDanger(err) {
      this.toastService.show(err, { classname: 'bg-danger text-light', delay: 15000 });
    }

    showSuccess(message: string) {
      this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
    }

    logout() {
      this.token = '';
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

    login(usuario: Usuario, recordar: boolean = false) {
      if (recordar) {
        localStorage.setItem('username', usuario.username);
      } else {
        localStorage.removeItem('username');
      }
      return this.http.post(`${URL}/login`, usuario)
        .pipe(map((resp: any) => {
          if (resp.ok) {
            this.token = resp.token;
            let payload = JSON.parse(atob(resp.token.split('.')[1]));
            this.usuario = payload.user;
            localStorage.setItem('token', resp.token);
            if (resp.user.role === 'USER_ROLE') {
              this.router.navigate(['/estudiante']);
            } else {
              this.router.navigate(['/dashboard']);
            }
           
          } else {
            this.showDanger(resp.message);
          }
        }),catchError( err => {
          this.showDanger('Error conection');
          return throwError( err);
        }));
    }

    renuevaToken() {  
      return this.http.get( `${URL}/renuevatoken` )
      .pipe(map((resp: any ) => {
          // console.log('Token renovado');
          this.token = resp.token;
          let payload = JSON.parse(atob(this.token.split('.')[1]));
          this.usuario = payload.user;
          localStorage.setItem('token', resp.token);
          return true;
      }),
      catchError( err => {
        this.router.navigate(['/login']);
        console.log('No se pudo renovar token', 'No fue posible renovar token', 'error');
        return throwError( err);
      }));
    }
    cargarUsuario( id: string) {
      return this.http.get(`${URL}/usuario/${id}`).pipe(map((resp: any) => resp.usuario));
    }
    cargarUsuarios( limite: number = 0, desde: number = 0 ) {
      return this.http.get(`${URL}/usuario?limite=${limite}&desde=${desde}`);
    }

    crearUsuario(user: Usuario) {
      return this.http.post(`${URL}/usuario`, user);
    }


    actualizarUsuario(usuario: Usuario) {
      return this.http.put(`${URL}/usuario/${usuario._id}`, usuario)
        .pipe(map((resp: any) => {
          this.showSuccess('Usuario actualizado');
          // if ( usuario._id === this.usuario._id ) {
          //   localStorage.setItem('token', resp.token);
          // }
          return true;
        }));
    }

    buscarUsuario(termino:string) {
      return this.http.get(`${URL}/usuario/buscar/${termino}`).pipe(map((resp:any) => resp.usuarios));
    }

    borrarUsuario( id: string ){
      return this.http.delete( `${URL}/usuario/${id}` );
    }
}
