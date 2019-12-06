import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Iglesia } from '../models/iglesia.model';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

const URL = environment.url;

const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable({
  providedIn: 'root'
})
export class ChurchService {

  constructor(
    private http: HttpClient
  ) { }

  cargarIglesia( id: string) {
    return this.http.get(`${URL}/iglesia/${id}`).pipe(map((resp: any) => resp.iglesia));
  }

  cargarIglesias( limite: number = 0, desde: number = 0 ) {
    return this.http.get(`${URL}/iglesia?limite=${limite}&desde=${desde}`);
  }

  /// Carga iglesias sin paginacion
  getIglesias( ) {
    return this.http.get(`${URL}/iglesia`).pipe(map((resp:any) => resp.churchs));
  }


  buscarIglesia( termino:string  = null) {
    if (termino ) {
      return this.http.get<any>(`${URL}/iglesia/buscar/${termino}`).pipe(map(resp => {
        console.log(resp)
        return resp.churchs;
        }));
    } else {
        return of([]);
    }
  }


  actualizarIglesia(iglesia: Iglesia) {
    return this.http.put(`${URL}/iglesia/${iglesia._id}`, iglesia);
  }

  crearIglesia(church: Iglesia) {
    return this.http.post(`${URL}/iglesia`, church);
  }

  borrarIglesia( id: string ){
    return this.http.delete( `${URL}/iglesia/${id}` );
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(`${URL}/iglesia/buscar/${term}`).pipe(
        map((response:any) => {
          console.log(response.churchs);
          return response.churchs;
        })
      );
  }
}


