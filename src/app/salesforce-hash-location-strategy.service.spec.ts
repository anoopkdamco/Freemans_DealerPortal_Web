import { TestBed } from '@angular/core/testing';

import { SalesforceHashLocationStrategyService } from './salesforce-hash-location-strategy.service';

describe('SalesforceHashLocationStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesforceHashLocationStrategyService = TestBed.get(SalesforceHashLocationStrategyService);
    expect(service).toBeTruthy();
  });
});
