import { TestBed } from '@angular/core/testing';

import { MapService } from './map-service.service';

describe('MapServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapService = TestBed.get(MapService);
    expect(service).toBeTruthy();
  });
});
