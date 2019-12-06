import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Ciclo } from '../../models/ciclo.model';
import { CicloService } from '../../services/ciclo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.scss']
})
export class CicloComponent implements OnInit {

  forma: FormGroup;
  id: string;
  cargando: boolean;

  constructor(
    private _cicloService: CicloService,
    private toastService: ToastService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.params.subscribe(params => {
      console.log('Gaaaaa',params);

      this.id = params['id'];
      if (this.id !== 'nuevo') {
        this.cargarCiclo(this.id);
      }
    });
  }

  ngOnInit() {

    this.forma = new FormGroup({
      _id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      numero: new FormControl(null, [Validators.required, Validators.minLength(2)] ),
    });

  }

  cargarCiclo( id: string ) {
    this._cicloService.cargarCiclo(id).subscribe(resp => {
      this.forma.patchValue(resp)
    });
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  registrarCiclo() {
    this.cargando = true;
    const ciclo = new Ciclo(
      this.forma.value.name,
      this.forma.value.numero
    );
    if (this.id === 'nuevo' ) {
      this._cicloService.createCiclo(ciclo).subscribe((resp: any) => {
        this.router.navigate(['/ciclos']);
        this.showSuccess('Ciclo Creado');
        });
    } else {
      console.log(this.forma.value);
      this._cicloService.updateCiclo(this.forma.value).subscribe(resp => {
        this.showSuccess('Ciclo Actualizado Correctamente')
        this.router.navigate(['/ciclos']);
      });
    }
  }

}
