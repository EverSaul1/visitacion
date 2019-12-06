import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';
import { ExportAsConfig, ExportAsService, SupportedExtensions } from 'ngx-export-as';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('buscarUsuario', {static: true}) buscarUsuario: ElementRef;
  usuarios: Usuario[] = [];

  cargando: Boolean;

  collectionSize:number;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;

  ///Exportar excel
  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'mytable',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };

  constructor(
    private _userService: UserService,
    private modalService:ModalService,
    private toastService: ToastService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit() {
    this._userService.renuevaToken();
    this.cargarUsuarios();
    const input = this.buscarUsuario.nativeElement;
    fromEvent(input, 'input')
      .pipe(map((k: KeyboardEvent) => {
        this.cargando = true
        return k.target['value'];
      }),
        debounceTime(1500),
      ).subscribe(val => {
        if (val !== '') {
          this._userService.buscarUsuario(val)
            .subscribe((resp:any) => {
              if (resp.length === 0 ) {
                this.cargando = false;
                this.usuarios = resp;
              }else {
                this.cargando = false;
                this.usuarios = resp;
              }
            });
        } else {
          this.cargarUsuarios();
          return;
        }
      });

  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    this.cargarUsuarios();
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
    this.cargarUsuarios();
  }

  loadData() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this._userService.cargarUsuarios( this.itemsPerPage, this.pageSize ).subscribe((resp:any) => {
      this.collectionSize = resp.cuantos;
      this.usuarios = resp.usuarios;
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._userService.actualizarUsuario(usuario)
      .subscribe();
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  borrarUsuario(usuario?: Usuario) {
    if (usuario._id === this._userService.usuario._id) {
      this.showSuccess('No se puede borrar a si mismo');
      return;
    }
    this.modalService.confirm('Por favor confirmar..', 'Realmente quieres Eliminar ... ?')
    .then((confirmed) => {
      if (confirmed) {
        this._userService.borrarUsuario(usuario._id).subscribe(resp => {
          this.showSuccess('Usuario eliminado');
          this.cargarUsuarios();
        });
      } else {
        this.showSuccess('Genial lo pensaste bien');
      }
      console.log('User confirmed:', confirmed)
    })
    .catch(() => this.showSuccess('Genial lo pensaste bien'));
  }


  // exportAs(type: SupportedExtensions, opt?: string) {
  //   this.config.type = type;
  //   if (opt) {
  //     this.config.options.jsPDF.orientation = opt;
  //   }
  //   this.exportAsService.save(this.config, 'myFile').subscribe(() => {
  //     // save started
  //   });
  //   // this.exportAsService.get(this.config).subscribe(content => {
  //   //   const link = document.createElement('a');
  //   //   const fileName = 'export.pdf';

  //   //   link.href = content;
  //   //   link.download = fileName;
  //   //   link.click();
  //   //   console.log(content);
  //   // });
  // }


  private pdfCallbackFn (pdf) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }
}
