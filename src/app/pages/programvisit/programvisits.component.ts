import { Component, OnInit } from '@angular/core';
import { ProgramvisitService } from '../../services/programvisit.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Programarvisita } from '../../models/programvisit.model';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-programvisits',
  templateUrl: './programvisits.component.html',
  styleUrls: ['./programvisits.component.scss']
})
export class ProgramvisitsComponent implements OnInit {

  visitasprogramadas:any [] = [];

  collectionSize:number;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  visitprogramadaDetalle: any;

  constructor(
    private _programarVisita: ProgramvisitService,
    private modalService: NgbModal,
    private _modalService:ModalService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.cargarProgamarvisita();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    this.cargarProgamarvisita();
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
    this.cargarProgamarvisita();
  }
  loadData() {
    this.cargarProgamarvisita();
  }
  cargarProgamarvisita( ) {
    this._programarVisita.cargarprogramarVisita( this.itemsPerPage, this.pageSize ).subscribe((resp:any) => {
      this.visitasprogramadas = resp.programvisit;
      this.collectionSize = resp.cuantos;
    });
  }

  openXl(content, visitprogramadaDetalle) {
    this.modalService.open(content, {size: 'xl'});
    console.log(visitprogramadaDetalle);
 }

 showSuccess(message: string) {
  this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
}

 borrarProgramvisit(progvisita?: Programarvisita) {
  this._modalService.confirm('Por Favor Confirme', 'Realmente quiere concluir con la visita programada... ?')
  .then((confirmed) => {
    if (confirmed) {
      this._programarVisita.borrarprogramarVisita(progvisita._id).subscribe(resp => {
        this.showSuccess('Visita programada concluida');
        this.cargarProgamarvisita();
      });
    } else {
      this.showSuccess('Genial lo pensaste bien');
    }
    console.log('User confirmed:', confirmed)
  })
  .catch(() => this.showSuccess('Genial lo pensaste bien'));
}

}
