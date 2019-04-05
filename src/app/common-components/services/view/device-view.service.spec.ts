import { TestBed } from '@angular/core/testing';

import { DeviceViewService } from './device-view.service';

describe('DeviceViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceViewService = TestBed.get(DeviceViewService);
    expect(service).toBeTruthy();
  });
});
