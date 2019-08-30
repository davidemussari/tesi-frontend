import { TestBed } from '@angular/core/testing';

import { IsloggedService } from './islogged.service';

describe('IsloggedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsloggedService = TestBed.get(IsloggedService);
    expect(service).toBeTruthy();
  });
});
