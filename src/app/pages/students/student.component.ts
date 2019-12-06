import { Component, OnInit, ViewChild, ViewEncapsulation, NgZone, ElementRef } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead';
import { Subject } from 'rxjs/internal/Subject';
import { ChurchService } from 'src/app/services/church.service';
import { ResponsibleService } from 'src/app/services/responsible.service';
import { SchoolService } from 'src/app/services/school.service';
import { CicloService } from '../../services/ciclo.service';
import { GroupService } from '../../services/group.service';
import { ToastService } from '../../services/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Iglesia } from '../../models/iglesia.model';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
import { merge } from 'rxjs/internal/observable/merge';
import { map } from 'rxjs/internal/operators/map';
import { Estudiante } from '../../models/estudiante.model';
import { Apoderado } from '../../models/apoderado.model';
import { Escuela } from '../../models/escuela.model';
import { Ciclo } from '../../models/ciclo.model';
import { Grupo } from '../../models/grupo.model';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  forma: FormGroup;
  formaApoderado: FormGroup;
  iglesias: Iglesia[] = [];
  churchs: any = [];
  closeResult: string;
  cargando: boolean = false;

  escuelas: Escuela;
  ciclos: Ciclo;
  grupos: Grupo;

  searching = false;
  searchFailed = false;
  noencontradoApoderado:Boolean = false;
  noencontradoResponsable: Boolean = false;

  estudiantes: any;

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  //////////////////
  latitude:any = -15.513596;
  longitude: any = -70.17548999999997;
  zoom: number = 12;
  private geoCoder;
  @ViewChild('buscar', {static: true})
  public searchElementRef: ElementRef;


  constructor(
    private _studentService: StudentService,
    private _churhService: ChurchService,
    private modalService: NgbModal,
    private _responsibleService: ResponsibleService,
    private _schoolService: SchoolService,
    private _cicloService: CicloService,
    private _groupService: GroupService,
    private toastService: ToastService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      _id: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      name: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      dni: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("[0-9]*")]),
      cell_phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.pattern("[0-9]*")]),
      origin: new FormControl(null,[Validators.required, Validators.minLength(8)] ),
      address: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
      sabbatical_school: new FormControl(null),
      baptized: new FormControl(null),
      filiacion_religoso: new FormControl(null, Validators.required),
      church: new FormControl(null),
      ciclo: new FormControl(null, Validators.required),
      group: new FormControl(null, Validators.required),
      school: new FormControl(null, Validators.required),
      father_apo: new FormControl(null, Validators.required),
      economic_responsible: new FormControl(null, Validators.required),
    });

    this.formaApoderado = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      cell_phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.pattern("[0-9]*")])
    });
    this.cargaEstudiante();
    this.cargarEscuelas();
    this.cargarCiclos();
    this.cargarGrupos();
    this.cargarIglesias();

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode'], componentRestrictions: {country: 'pe'}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  cargaEstudiante() {
    this._studentService.cargarEstudiante().subscribe(resp => {
      this.estudiantes = resp;
      if (resp.length >= 1) {
        this.forma.patchValue(resp[0]);
        this.latitude = resp[0].latitude;
        this.longitude = resp[0].longitude;
      } else {
        this.setCurrentLocation();
      }
    });
  }

  cargarIglesias() {
    this._churhService.getIglesias().subscribe(resp => {
      this.iglesias = resp;
      for (const iglesia in resp) {
        if (resp.hasOwnProperty(iglesia)) {
          const church = resp[iglesia];
          this.churchs.push(church.name);
        }
      }
    })
  }


  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === null ? this.churchs
        : this.churchs.filter(v =>  v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  // Map

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }
  showDanger(message) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: 5000 });
  }

  registrarEstudiante() {
    let estudiante = new Estudiante(
      this.forma.value.email,
      this.forma.value.name,
      this.forma.value.dni,
      this.forma.value.cell_phone,
      this.forma.value.origin,
      this.forma.value.address,
      this.forma.value.latitude = this.latitude,
      this.forma.value.longitude = this.longitude,
      this.forma.value.sabbatical_school,
      this.forma.value.baptized,
      this.forma.value.filiacion_religoso,
      this.forma.value.church,
      this.forma.value.ciclo,
      this.forma.value.group,
      this.forma.value.school,
      this.forma.value.father_apo ? this.forma.value.father_apo._id: null,
      this.forma.value.economic_responsible ? this.forma.value.economic_responsible._id: null
    )
    if (this.estudiantes.length === 0) {
      this._studentService.crearEstudiante(estudiante).subscribe(resp => {
        this.router.navigate(['/dashboard']);
        this.showSuccess('Estudiante creado');
      }, err => {
        this.showDanger('Dni se ecuentra registrado')
      });
    } else {
      this._studentService.actualizarEstudiante(this.forma.value).subscribe(resp => {
        this.showSuccess('Datos actualizado')
      });
    }
  }

  registrarApoderado() {
    let apoderado = new Apoderado (
      this.formaApoderado.value.name,
      this.formaApoderado.value.cell_phone,
    )
    this._responsibleService.crearApoderado(apoderado).subscribe(resp => {
      this.formaApoderado.reset();
      this.modalService.dismissAll();
    })
  }

  formatResponsable = (value: Iglesia) => value.name || '';
  buscarResponsable = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._responsibleService.buscarApoderado(term).pipe(
          tap((resp) => {
            if (term.length >= 2 && resp.length === 0) {
              this.noencontradoResponsable = true;
            } else {
              this.searchFailed = false
              this.noencontradoResponsable = false;
            }
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    formatApoderado = (value: any) => value.name || '';
    buscarApoderado = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._responsibleService.buscarApoderado(term).pipe(
          tap((resp) => {
            if (term.length >= 2 && resp.length === 0) {
              this.noencontradoApoderado = true;
            } else {
              this.searchFailed = false
              this.noencontradoApoderado = false;
            }
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    ///////////// Escuelas
    cargarEscuelas() {
      this._schoolService.getEscuelas().subscribe(resp => this.escuelas = resp);
    }

    cargarCiclos() {
      this._cicloService.getCiclos().subscribe(resp => this.ciclos = resp );
    }

    cargarGrupos() {
      this._groupService.getGrupos().subscribe(resp => this.grupos = resp );
    }

    ////Mapas
    agregarMarcador( $event ) {
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
    }

    //Modal

    openVerticallyCentered(content) {
      this.modalService.open(content, { centered: true });
    }
}
