import { TestBed } from '@angular/core/testing';

import { EserciziApiService } from './esercizi-api.service';

describe('EserciziApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EserciziApiService = TestBed.get(EserciziApiService);
    expect(service).toBeTruthy();
  });
});
