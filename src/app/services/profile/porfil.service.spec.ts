import { TestBed } from '@angular/core/testing';

import { PorfilService } from './porfil.service';

describe('PorfilService', () => {
  let service: PorfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
