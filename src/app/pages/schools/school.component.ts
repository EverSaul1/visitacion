import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Escuela } from '../../models/escuela.model';
import { SchoolService } from '../../services/school.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  escuelas: Escuela[] = [];
  forma: FormGroup;
  id: string;
  cargando: boolean;

  constructor(
    private _schoolService: SchoolService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    activatedRoute.params.subscribe(params => {
      console.log('Gaaaaa',params);

      this.id = params['id'];
      if (this.id !== 'nuevo') {
        this.cargarEscuela(this.id);
      }
    });
  }

  ngOnInit() {
    this.forma = new FormGroup({
      _id: new FormControl(null),
      name: new FormControl( null, [Validators.required] ),
      name_short: new FormControl( null, [Validators.required] )
    })
  }


  cargarEscuela( id: string ){
    this._schoolService.cargarEscuela(id).subscribe(resp => {
      this.forma.patchValue(resp);
    });
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }


  registrarEscuela( ){
    this.cargando = true;
    let school = new Escuela(
      this.forma.value.name,
      this.forma.value.name_short,
    );
    if (this.id === 'nuevo') {
      this._schoolService.crearEscuela(school).subscribe((resp:any) => {
        this.showSuccess('Escuela creado');
        this.router.navigate(['/schools']);
      });
    } else {
      this._schoolService.actualizarEscuela(this.forma.value).subscribe(resp => {
        this.showSuccess('Escuela actualizado');
        this.router.navigate(['/schools']);
      })
    }


  }

  cargarEscuelas()  {
    this._schoolService.cargarEscuelas(  ).subscribe((resp:any) => {
      this.escuelas = resp.schools;
    });
  }

  



}
