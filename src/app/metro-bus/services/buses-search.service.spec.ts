import { TestBed } from '@angular/core/testing';

import { BusesSearchService } from './buses-search.service';

describe('BusesSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusesSearchService = TestBed.get(BusesSearchService);
    expect(service).toBeTruthy();
  });
});
