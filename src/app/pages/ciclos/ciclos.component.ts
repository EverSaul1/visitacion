import { Component, OnInit } from '@angular/core';
import { Ciclo } from '../../models/ciclo.model';
import { CicloService } from '../../services/ciclo.service';
import { ToastService } from '../../services/toast.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.scss']
})
export class CiclosComponent implements OnInit {

  ciclos: Ciclo[] = []

  collectionSize:number;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;

  constructor(
    private _cicloService: CicloService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.cargarCiclos();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    this.cargarCiclos();
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
    this.cargarCiclos();
  }

  loadData() {
    this.cargarCiclos();
  }

  cargarCiclos() {
    this._cicloService.cargarCiclos( this.itemsPerPage, this.pageSize ).subscribe((resp:any) => {
      this.collectionSize = resp.cuantos;
      console.log(resp);
      this.ciclos = resp.ciclos;
      console.log(this._cicloService);

    });
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  deleteCiclo(ciclo?: Ciclo) {
    this.modalService.confirm('Confirme Por Favor', 'Esta seguro de eliminar ' + ciclo.name + '?')
    .then((confirmed) => {
      if (confirmed) {
        this._cicloService.deleteCiclo(ciclo._id).subscribe(resp => {
          this.showSuccess('Ciclo Eliminado');
          this.cargarCiclos();
        });
      } else {
        this.showSuccess('Genial lo pensaste bien');
      }
      console.log('User confirmed:', confirmed)
    })
    .catch(() => this.showSuccess('Genial lo pensaste bien'));
  }

}
