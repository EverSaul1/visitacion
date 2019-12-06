import { Ciclo } from './../models/ciclo.model';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CicloService {

constructor(
  private http: HttpClient
) { }

cargarCiclo( id: string) {
  return this.http.get(`${URL}/ciclo/${id}`).pipe(map((resp: any) => resp.ciclo));
}

cargarCiclos( limite: number = 0, desde: number = 0 ) {
  return this.http.get(`${URL}/ciclo?limite=${limite}&desde=${desde}`);
}

/// Carga ciclos sin paginacion
getCiclos( ) {
  return this.http.get(`${URL}/ciclo`).pipe(map((resp:any) => resp.ciclos));
}

createCiclo(ciclo: Ciclo) {
  return this.http.post(`${URL}/ciclo`, ciclo);
}

updateCiclo(ciclo: Ciclo) {
  return this.http.put(`${URL}/ciclo/${ciclo._id}`, ciclo);
}

deleteCiclo( id: string ){
  return this.http.delete( `${URL}/ciclo/${id}`);
}

}
