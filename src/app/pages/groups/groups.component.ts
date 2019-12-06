import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Grupo } from '../../models/grupo.model';
import { ModalService } from '../../services/modal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  grupos: Grupo[] = [];
  collectionSize:number;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;

  constructor(
    private _groupService: GroupService,
    private modalService:ModalService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.cargarGrupos();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    this.cargarGrupos();
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
    this.cargarGrupos();
  }

  loadData() {
    this.cargarGrupos();
  }

  cargarGrupos() {
    this._groupService.cargarGrupos( this.itemsPerPage, this.pageSize ).subscribe((resp:any) => {
      this.grupos = resp['groups'];

    });
  }

  borrarGrupo(grupo?: Grupo) {
    this.modalService.confirm('Por favor confirmar', 'Realmente deseas Eliminar '+ grupo.name + '...?')
    .then((confirmed) => {
      if (confirmed) {
        this._groupService.borrarGrupo(grupo._id).subscribe(resp => {
          this.showSuccess('Grupo eliminado');
          this.cargarGrupos();
        });
      } else {
        this.showSuccess('Genial lo pensaste bien');
      }
    })
    .catch(() => this.showSuccess('Genial lo pensaste bien'));
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

}
