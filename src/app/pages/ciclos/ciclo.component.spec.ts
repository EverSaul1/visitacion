/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CicloComponent } from './ciclo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { empty, from } from 'rxjs';
import { CicloService } from '../../services/ciclo.service';
import { Ciclo } from '../../models/ciclo.model';

class fakeRouter {
  navigate(params){};
}

class fakeActivateRouter{
  params: Observable<any> = empty();
}

describe('CicloComponent', () => {
  let component: CicloComponent;
  let fixture: ComponentFixture<CicloComponent>;
  const servicio = new CicloService(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicloComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule
      ],
      providers: [
        {provide:Router, useClass: fakeRouter},
        {provide:ActivatedRoute, useClass: fakeActivateRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Ciclo componente', () => {
    expect(component).toBeTruthy();
  });

  // it('Enviar nueva visita', () => {
  //   expect(component.forma.valid).toBeFalsy();
  //   // component.forma.controls['_id'].setValue(null);
  //   component.forma.controls['name'].patchValue("primero");
  //   component.forma.controls['numero'].patchValue("1");
  //   expect(component.forma.valid).toBeFalsy();

  //   let ciclo: Ciclo;
  //   // Subscribe to the Observable and store the user in a local variable.
  //   // component.registrarCiclo.subscribe((value) => ciclo = value);

  //   // Trigger the login function
  //   component.registrarCiclo();

  //   // Now we can check to make sure the emitted value is correct
  //   // expect(ciclo._id).toBe(null);
  //   expect(ciclo.name).toBe("primero");
  //   expect(ciclo.numero).toBe("1");
  // });
  it('Número válido', () => {
    let errors = {};
    let numero = component.forma.controls['numero'];

    // Email field is required
    errors = numero.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set number to something
    numero.setValue("1");
    errors = numero.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set number to something correct
    numero.setValue("123456789");
    errors = numero.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
});

it('formulario no válido cuando está vacío', () => {
  expect(component.forma.valid).toBeFalsy();
});
});
