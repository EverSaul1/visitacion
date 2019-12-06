import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../models/estudiante.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { of } from 'rxjs/internal/observable/of';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }

  crearEstudiante(student: Estudiante) {
    return this.http.post(`${URL}/estudiante`, student);
  }

  cargarEstuadiantes( limite: number = 0, desde: number = 0 ) {
    return this.http.get(`${URL}/estudiante?limite=${limite}&desde=${desde}`);
  }

  cargarEstudiante() {
    return this.http.get(`${URL}/estudiante/usuario`).pipe(map((resp:any) => resp.student));
  }

  actualizarEstudiante(student: Estudiante) {
    return this.http.put(`${URL}/estudiante/${student._id}`, student);
  }

  buscarEstudiante(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(`${URL}/estudiante/buscar/${term}`).pipe(
        map((response:any) => {
          return response.students;
        })
      );
  }
}
