/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { empty, from } from 'rxjs';

import { VisitationComponent } from './visitation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { FileUploadModule } from 'ng2-file-upload';
import { CloudinarySettings } from '../settings';
import { Visita } from '../../models/visita.model';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};

class fakeRouter {
  navigate(params){};
}

class fakeActivateRouter{
  params: Observable<any> = empty();
}

describe('VisitationComponent', () => {
  let component: VisitationComponent;
  let fixture: ComponentFixture<VisitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitationComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        NgbModule,
        FileUploadModule,
        CloudinaryModule.forRoot(cloudinary, CloudinarySettings)
      ],
      providers: [
        {provide:Router, useClass: fakeRouter},
        {provide:ActivatedRoute, useClass: fakeActivateRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente de visita', () => {
    expect(component).toBeTruthy();
  }); 

  // it( 'Debe de redireccionar a Visitas cuando se guarde', () => {
  //   const router = TestBed.get(Router);
  //   const spy = spyOn( router, 'navigate' );
  //   component.registrarVisita();
  //   expect( spy ).toHaveBeenCalledWith(['/visitas']);
  // });

  it('formulario no válido cuando está vacío', () => {
    expect(component.forma.valid).toBeFalsy();
  });

  it('derivacion validez de campo', () => {
    let derivacion = component.forma.controls['derivacion']; (1)
    expect(derivacion.valid).toBeFalsy(); (2)
  });



});
