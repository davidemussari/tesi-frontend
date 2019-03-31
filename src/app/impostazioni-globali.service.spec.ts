import { TestBed } from '@angular/core/testing';

import { ImpostazioniGlobaliService } from './impostazioni-globali.service';

describe('ImpostazioniGlobaliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImpostazioniGlobaliService = TestBed.get(ImpostazioniGlobaliService);
    expect(service).toBeTruthy();
  });
});
