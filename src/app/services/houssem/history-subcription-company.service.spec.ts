import { TestBed } from '@angular/core/testing';

import { HistorySubcriptionCompanyService } from './history-subcription-company.service';

describe('HistorySubcriptionCompanyService', () => {
  let service: HistorySubcriptionCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorySubcriptionCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
