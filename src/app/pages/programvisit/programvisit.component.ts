import { Component, OnInit } from '@angular/core';
import { ProgramvisitService } from '../../services/programvisit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Programarvisita } from '../../models/programvisit.model';
import { StudentService } from '../../services/student.service';
import { Estudiante } from '../../models/estudiante.model';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-programvisit',
  templateUrl: './programvisit.component.html',
  styleUrls: ['./programvisit.component.scss']
})
export class ProgramvisitComponent implements OnInit {
  forma: FormGroup;
  searching = false;
  noencontradoEstudiante:Boolean = false;
  searchFailed = false;
  cargando: boolean;

  constructor(
    private _programarVisita: ProgramvisitService,
    private _studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      _id: new FormControl(null),
      estado: new FormControl(null),
      programed: new FormControl(null, Validators.required),
      student: new FormControl(null, Validators.required)
    });
  }

  formatEstudiante = (value: Estudiante) => value.name || '';
  buscarEstudiante = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._studentService.buscarEstudiante(term).pipe(
          tap((resp) => {
            if (term.length >= 2 && resp.length === 0) {
              this.noencontradoEstudiante = true;
            } else {
              this.searchFailed = false
              this.noencontradoEstudiante = false;
            }
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  programarVisita() {
    this.cargando = true;
    let programarvisita = new Programarvisita(
      this.forma.value.programed,
      this.forma.value.student
    )

    console.log(programarvisita);
    this._programarVisita.programarVisita(programarvisita).subscribe(resp => {
      this.router.navigate(['/programarvisitas']);
      console.log(resp);
    })

  }

}
