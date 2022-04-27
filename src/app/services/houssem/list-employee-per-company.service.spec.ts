import { TestBed } from '@angular/core/testing';

import { ListEmployeePerCompanyService } from './list-employee-per-company.service';

describe('ListEmployeePerCompanyService', () => {
  let service: ListEmployeePerCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListEmployeePerCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
