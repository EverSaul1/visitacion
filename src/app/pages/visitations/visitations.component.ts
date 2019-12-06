import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VisitationService } from '../../services/visitation.service';
import { Visita } from '../../models/visita.model';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ExportAsService, SupportedExtensions, ExportAsConfig } from 'ngx-export-as';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';

@Component({
  selector: 'app-visitations',
  templateUrl: './visitations.component.html',
  styleUrls: ['./visitations.component.scss']
})
export class VisitationsComponent implements OnInit {

  visitas: Visita;
  pageSize: number;
  currentPage = 1;
  itemsPerPage = 5;
  collectionSize: number;
  visitaDetalle: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  loadImages: any[] = [];

  
  listaImagenes: any[] = [];

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

  @ViewChild('buscarVisita', {static: true}) buscarVisita: ElementRef;
  cargando: Boolean;

  constructor(
    private _visitationService: VisitationService,
    private exportAsService: ExportAsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.cargarVisitaciones();
    const input = this.buscarVisita.nativeElement;
    fromEvent(input, 'input')
      .pipe(map((k: KeyboardEvent) => {
        this.cargando = true
        return k.target['value'];
      }),
        debounceTime(1500),
      ).subscribe(val => {
        if (val !== '') {
          this._visitationService.buscarVisita(val)
            .subscribe((resp:any) => {
              console.log(resp);

              if (resp.length === 0 ) {
                this.cargando = false;
                this.visitas = resp;
              }else {
                this.cargando = false;
                this.visitas = resp;
              }
            });
        } else {
          this.cargarVisitaciones();
          return;
        }
      });

      this.galleryImages = this.listaImagenes;
      this.galleryOptions = [
       { "previewCloseOnClick": true, "previewCloseOnEsc": true, "thumbnailsColumns": 3, "thumbnailsRows": 2, "thumbnailsPercent": 40, "imagePercent": 60, "thumbnailMargin": 2, "thumbnailsMargin": 2 },
       { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
       { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
       ]

  }
  loadData() {
    this.cargarVisitaciones();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    this.cargarVisitaciones();
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
    this.cargarVisitaciones();
  }

  cargarVisitaciones() {
    this._visitationService.cargarVisitas( this.itemsPerPage, this.pageSize ).subscribe((resp:any) => {
      this.visitas = resp.visitations;
      this.collectionSize = resp.cuantos;
      console.log('datos: ', resp);
    });
  }
  
  openXl(content,visitaDetalle) {
    this.modalService.open(content, {size: 'xl'});
    for ( const i in visitaDetalle.imgs) {
      const img = {'small': visitaDetalle.imgs[i], 'medium': visitaDetalle.imgs[i], 'big': visitaDetalle.imgs[i]}
      this.listaImagenes.push(img);
    }
  }

  /// Exportar excel

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, 'Visita').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   const link = document.createElement('a');
    //   const fileName = 'export.pdf';

    //   link.href = content;
    //   link.download = fileName;
    //   link.click();
    //   console.log(content);
    // });
  }


  private pdfCallbackFn (pdf) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }


}
