import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Escuela } from '../../models/escuela.model';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
  escuelas: Escuela[] = [];

  cargando: Boolean;

  collectionSize:number;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize: number;

  constructor(
    private _schoolService: SchoolService,
    private modalService: ModalService,
    private toastService: ToastService,
  ) {
   }

  ngOnInit() {
    this.cargarEscuelas();
  }

  cargarEscuelas() {
    this._schoolService.cargarEscuelas( this.itemsPerPage, this.pageSize ).subscribe((resp:any) => {
      this.collectionSize = resp.cuantos;
      console.log(resp);
      this.escuelas = resp.schools;
      console.log(this._schoolService);

    });
  }

  borrarEscuela(escuela?: Escuela) {
    this.modalService.confirm('Confirme Por Favor..', 'Esta seguro de eliminar ' + escuela.name + '?')
    .then((confirmed) => {
      if (confirmed) {
        this._schoolService.borrarEscuela(escuela._id).subscribe(resp => {
          this.showSuccess('Escuela eliminado');
          this.cargarEscuelas();
        });
      } else {
        this.showSuccess('Genial lo pensaste bien');
      }
      console.log('Escuela Confirmada:', confirmed)
    })
    .catch(() => this.showSuccess('Genial lo pensaste bien'));
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  loadData() {
    this.cargarEscuelas();
  }
}
