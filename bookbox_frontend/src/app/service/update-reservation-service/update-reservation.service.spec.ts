import { TestBed } from '@angular/core/testing';

import { UpdateReservationService } from './update-reservation.service';

describe('UpdateReservationService', () => {
  let service: UpdateReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
