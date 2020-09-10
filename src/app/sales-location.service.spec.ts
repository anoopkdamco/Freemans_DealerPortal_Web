import { TestBed } from '@angular/core/testing';

import { SalesLocationService } from './sales-location.service';

describe('SalesLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesLocationService = TestBed.get(SalesLocationService);
    expect(service).toBeTruthy();
  });
});
