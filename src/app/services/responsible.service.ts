import { Injectable } from '@angular/core';
import { Apoderado } from '../models/apoderado.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

const URL = environment.url;



@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  constructor(
    private http: HttpClient
  ) { }

  buscarDni(Obj:any) {
    return this.http.post(`${URL}/responsable/dni`, Obj);
  }

  crearApoderado(responsible: Apoderado) {
    return this.http.post(`${URL}/responsable`, responsible);
  }

  buscarApoderado(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(`${URL}/responsable/buscar/${term}`).pipe(
        map((response:any) => {
          console.log(response);
          
          return response.apoderados;
        })
      );
  }
}
