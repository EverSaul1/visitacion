import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { UserService } from './services/user.service';


@Injectable()
@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(public _usuarioService: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Solicitud interceptada');
    const token = this._usuarioService.token;
    if (token) {
      request = request.clone({
        setHeaders: {
          token: token
        }
      });
    }
    return next.handle(request)
    .pipe(
     catchError(err => {
       if (err instanceof HttpErrorResponse && err.status === 0) {
         console.log('Compruebe su conexión a Internet y vuelva a intentarlo más tarde');
       } else if (err instanceof HttpErrorResponse && err.status === 401) {
        //  this._usuarioService.logout();
       }
       return throwError(err);
     })
   );
  }
}