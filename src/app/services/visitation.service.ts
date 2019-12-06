import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Visita } from '../models/visita.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class VisitationService {

  constructor(
    private http: HttpClient
  ) { }

  cargarVisita( id: string) {
    return this.http.get(`${URL}/visita/${id}`).pipe(map((resp: any) => resp.visitation));
  }

  cargarReporte() {
    return this.http.get(`${URL}/visita/reporte`);
  }

  crearVisita(visitation: Visita) {
    return this.http.post(`${URL}/visita`, visitation);
  }

  actualizarVisita(visita: Visita) {
    return this.http.put(`${URL}/visita/${visita._id}`, visita);
  }

  cargarVisitas(limite: number = 0, desde: number = 0) {
    return this.http.get(`${URL}/visita?limite=${limite}&desde=${desde}`);
  }

  buscarVisita(termino:string) {
    return this.http.get(`${URL}/visita/buscar/${termino}`).pipe(map((resp:any) => resp.visitas));
  }
}
