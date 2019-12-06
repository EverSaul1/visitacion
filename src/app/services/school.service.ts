import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Escuela } from '../models/escuela.model';
import { ToastService } from './toast.service';
import { map } from 'rxjs/internal/operators/map';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  escuela: any;
  token: any;

constructor(
  private http: HttpClient,
  private toastService: ToastService
) {
 }


cargarEscuela( id: string) {
  return this.http.get(`${URL}/escuela/${id}`).pipe(map((resp: any) => resp.escuela));
}


cargarEscuelas( limite: number = 0, desde: number = 0 ) {
  return this.http.get(`${URL}/escuela?limite=${limite}&desde=${desde}`);
}

///Carga toda las escuelas sin paginación
getEscuelas() {
  return this.http.get(`${URL}/escuela`).pipe(map((resp:any) => resp.schools));
}


crearEscuela(school: Escuela) {
  return this.http.post(`${URL}/escuela`, school);
}

actualizarEscuela(school: Escuela) {
  return this.http.put(`${URL}/escuela/${school._id}`, school);
}

borrarEscuela( id: string ){
  return this.http.delete( `${URL}/escuela/${id}` );
}

showDanger(err) {
  this.toastService.show(err, { classname: 'bg-danger text-light', delay: 5000 });
}

showSuccess(message: string) {
  this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
}

}

