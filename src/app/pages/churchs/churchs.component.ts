import { Component, OnInit } from '@angular/core';
import { ChurchService } from '../../services/church.service';
import { Iglesia } from '../../models/iglesia.model';
import { ToastService } from '../../services/toast.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-churchs',
  templateUrl: './churchs.component.html',
  styleUrls: ['./churchs.component.scss']
})
export class ChurchsComponent implements OnInit {

  cargando: Boolean;

  iglesias: Iglesia[] = [];

  collectionSize:number;

  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;

  constructor(
    private _churhService: ChurchService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.cargarIglesias();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    this.cargarIglesias();
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
    this.cargarIglesias();
  }

  loadData() {
    this.cargarIglesias();
  }

  cargarIglesias() {
    this._churhService.cargarIglesias( this.itemsPerPage, this.pageSize ).subscribe(resp => {
      this.iglesias = resp['churchs'];
      console.log(this.iglesias);
    });
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  borrarIglesia(iglesia?: Iglesia) {
    this.modalService.confirm('Confirme Por Favor..', 'Esta seguro de eliminar ' + iglesia.name + '?')
    .then((confirmed) => {
      if (confirmed) {
        this._churhService.borrarIglesia(iglesia._id).subscribe(resp => {
          this.showSuccess('Iglesia eliminado');
          this.cargarIglesias();
        });
      } else {
        this.showSuccess('Genial lo pensaste bien');
      }
      console.log('User confirmed:', confirmed)
    })
    .catch(() => this.showSuccess('Genial lo pensaste bien'));
  }


}
