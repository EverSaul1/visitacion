import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Programarvisita } from '../models/programvisit.model';
import { HttpClient } from '@angular/common/http';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProgramvisitService {

  constructor(
    private http: HttpClient
  ) { }

  programarVisita(programarvisita: Programarvisita) {
    return this.http.post(`${URL}/programvisit`, programarvisita);
  }

  cargarprogramarVisita( limite: number = 0, desde: number = 0 ) {
    return this.http.get(`${URL}/programvisit?limite=${limite}&desde=${desde}`);
  }

  borrarprogramarVisita( id: string ){
    return this.http.delete( `${URL}/programvisit/${id}` );
  }
}
