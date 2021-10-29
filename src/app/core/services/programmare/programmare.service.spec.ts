import { TestBed } from '@angular/core/testing';

import { ProgrammareService } from './programmare.service';

describe('ProgrammareService', () => {
  let service: ProgrammareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
