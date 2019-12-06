import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Iglesia } from '../../models/iglesia.model';
import { ChurchService } from '../../services/church.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-church',
  templateUrl: './church.component.html',
  styleUrls: ['./church.component.scss']
})
export class ChurchComponent implements OnInit {
  forma: FormGroup;
  id: string;
  cargando: boolean;

  constructor(
    private _churchService: ChurchService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id !== 'nuevo') {
        this.cargarIglesia(this.id);
      }
    });
   }

  ngOnInit() {
    this.forma = new FormGroup({
      _id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(8)] ),
    });
  }

  cargarIglesia( id: string ) {
    this._churchService.cargarIglesia(id).subscribe(resp => {
      this.forma.patchValue(resp)
    })
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  registrarIglesia() {
    this.cargando = true;
    let iglesia = new Iglesia(
      this.forma.value.name,
      this.forma.value.description,
    )
    if (this.id === 'nuevo' ) {
      this._churchService.crearIglesia(iglesia).subscribe(resp => {
          this.showSuccess('Iglesia creada');
          this.router.navigate(['/iglesias']);
        });
    } else {
      this._churchService.actualizarIglesia(this.forma.value).subscribe(resp => {
        this.showSuccess('Iglesia actualizado')
        this.router.navigate(['/iglesias']);
      });
    }
  }

}
