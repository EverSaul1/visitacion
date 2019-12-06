import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Grupo } from '../models/grupo.model';
import { map } from 'rxjs/internal/operators/map';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GroupService {


constructor(
  private http: HttpClient,
) { }

cargarGrupo( id: string) {
  return this.http.get(`${URL}/grupo/${id}`).pipe(map((resp: any) => resp.grupo));
}

cargarGrupos( limite: number = 0, desde: number = 0 ) {
  return this.http.get(`${URL}/grupo?limite=${limite}&desde=${desde}`);
}

// Cargar todo los grupos 
getGrupos( ) {
  return this.http.get(`${URL}/grupo`).pipe(map((resp:any) => resp.groups));
}

crearGrupo(group: Grupo) {
  return this.http.post(`${URL}/grupo`, group);
}

actualizarGrupo(grupo: Grupo) {
  return this.http.put(`${URL}/grupo/${grupo._id}`, grupo);
}

borrarGrupo( id: string ){
  return this.http.delete( `${URL}/grupo/${id}`);
}

}
