import { TestBed } from '@angular/core/testing';

import { UpdateBoxService } from './update-box.service';

describe('UpdateBoxService', () => {
  let service: UpdateBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
