import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Grupo } from '../../models/grupo.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  forma: FormGroup
  id: string;
  cargando: boolean;

  constructor(
    private _groupService: GroupService,
    private toastService: ToastService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    activatedRoute.params.subscribe(params => {
      console.log('Funka',params);

      this.id = params['id'];
      if (this.id !== 'nuevo') {
        this.cargarGrupo(this.id);
      }
    });
  }

  ngOnInit() {
    this.forma = new FormGroup({
      _id: new FormControl(null),
      name: new FormControl( null, [Validators.required, Validators.minLength(6)] ),
      numero: new FormControl( null, [Validators.required, Validators.maxLength(2)] )
    })
  }

  cargarGrupo( id: string ) {
    this._groupService.cargarGrupo(id).subscribe(resp => {
      this.forma.patchValue(resp)
    })
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  registrarGrupo() {
    this.cargando = true;
    let grupo = new Grupo(
      this.forma.value.name,
      this.forma.value.numero
    )
    if (this.id === 'nuevo' ) {
      this._groupService.crearGrupo(grupo).subscribe((resp: any) => {
        this.router.navigate(['/grupos']);
        this.showSuccess('Ciclo Creado');
        });
    } else {
      this._groupService.actualizarGrupo(this.forma.value).subscribe(resp => {
        this.showSuccess('Grupo Actualizado Correctamente')
        this.router.navigate(['/grupos']);
      });
    }
  }

}
