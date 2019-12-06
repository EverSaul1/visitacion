/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CicloService } from './ciclo.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Ciclo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CicloService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([CicloService], (service: CicloService) => {
    expect(service).toBeTruthy();
  }));

});
