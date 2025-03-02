import { TestBed } from '@angular/core/testing';

import { OperatingHoursService } from './operating-hours.service';

describe('OperatingHoursService', () => {
  let service: OperatingHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatingHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
