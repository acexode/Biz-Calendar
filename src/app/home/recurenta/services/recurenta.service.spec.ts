import { TestBed } from '@angular/core/testing';

import { RecurentaService } from './recurenta.service';

describe('RecurentaService', () => {
  let service: RecurentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecurentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
