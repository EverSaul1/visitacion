import { Component, OnInit } from '@angular/core';
import { VisitationService } from '../../services/visitation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Visita } from '../../models/visita.model';
import { StudentService } from '../../services/student.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Estudiante } from '../../models/estudiante.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ToastService } from '../../services/toast.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visitation',
  templateUrl: './visitation.component.html',
  styleUrls: ['./visitation.component.scss']
})
export class VisitationComponent implements OnInit {
  currentRate = 6;
  forma: FormGroup;
  ctrl = new FormControl(null, Validators.required);

  searching = false;
  noencontradoEstudiante:Boolean = false;
  searchFailed = false;
  cargando: boolean;


  // Upload image cloudinary
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public imageDataArray;

  listaImagenes: any [] = [];

  id: string;

  constructor(
    private _visitationService: VisitationService,
    private _studentService: StudentService,
    private toastService: ToastService,
    private cloudinary: Cloudinary,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.params.subscribe(params => {
      console.log('Gaaaaa',params);

      this.id = params['id'];
      if (this.id !== 'nuevo') {
        this.cargarVisita(this.id);
      }
    });
   }

  ngOnInit() {
    this.forma = new FormGroup({
      _id: new FormControl(null), 
      motivo_visitacion: new FormControl(null, Validators.required),
      aspec_academico: new FormControl(null, Validators.required),
      desc_academico: new FormControl(null),
      aspec_emocional: new FormControl(null, Validators.required),
      desc_emocional: new FormControl(null),
      aspec_salud: new FormControl(null, Validators.required),
      desc_salud: new FormControl(null),
      aspec_economico: new FormControl(null, Validators.required),
      desc_economico: new FormControl(null),
      aspec_espiritual: new FormControl(null, Validators.required),
      desc_espiritual: new FormControl(null),
      derivacion: new FormControl(null, Validators.required),
      student: new FormControl(null, Validators.required),
      imgs: new FormControl(null),
    });
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
      autoUpload: false, 
      isHTML5: true, 
      removeAfterUpload: true, 
      headers: [ 
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    

    const upsertResponse = fileItem => {
      if (fileItem.status !== 200) {
        return false;
      }      
      this.listaImagenes.push(fileItem.data.secure_url.slice(0,50)+'q_auto:low'+fileItem.data.secure_url.slice(61));
    }

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      fileItem.withCredentials = false;
      return { fileItem, form };
    }

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file, status,
          data: JSON.parse(response),
        }
      );
  }


  cargarVisita( id: string ) {
    this._visitationService.cargarVisita(id).subscribe(resp => {
      console.log(resp);
      this.forma.patchValue(resp)
    })
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  registrarVisita() {
    this.cargando = true;
    let visita = new Visita(
      this.forma.value.motivo_visitacion,
      this.forma.value.aspec_academico,
      this.forma.value.desc_academico,
      this.forma.value.aspec_emocional,
      this.forma.value.desc_emocional,
      this.forma.value.aspec_salud,
      this.forma.value.desc_salud,
      this.forma.value.aspec_economico,
      this.forma.value.desc_economico,
      this.forma.value.aspec_espiritual,
      this.forma.value.desc_espiritual,
      this.forma.value.derivacion,
      this.forma.value.student,
      this.forma.value.imgs = this.listaImagenes
    )
    if (this.id === 'nuevo') {
      this._visitationService.crearVisita(visita).subscribe(resp => {
        this.router.navigate(['/visitas']);
        this.showSuccess('Visita creado')
      });
    } else {
      this._visitationService.actualizarVisita(this.forma.value).subscribe(resp => {
        this.router.navigate(['/visitas']);
        this.showSuccess('Visitida actualizada')
      })
    }
  }

  formatEstudiante = (value: Estudiante) => value.name || '';
  buscarEstudiante = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._studentService.buscarEstudiante(term).pipe(
          tap((resp) => {
            if (term.length >= 2 && resp.length === 0) {
              this.noencontradoEstudiante = true;
            } else {
              this.searchFailed = false
              this.noencontradoEstudiante = false;
            }
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

}
