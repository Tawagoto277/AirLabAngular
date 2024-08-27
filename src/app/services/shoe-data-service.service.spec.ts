import { TestBed } from '@angular/core/testing';

import { ShoeDataServiceService } from './shoe-data-service.service';

describe('ShoeDataServiceService', () => {
  let service: ShoeDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoeDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
