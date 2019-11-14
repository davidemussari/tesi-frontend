import { TestBed } from '@angular/core/testing';

import { VariabiliGlobaliService } from './variabili-globali.service';

describe('VariabiliGlobaliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VariabiliGlobaliService = TestBed.get(VariabiliGlobaliService);
    expect(service).toBeTruthy();
  });
});
