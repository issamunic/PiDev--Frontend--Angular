import { TestBed } from '@angular/core/testing';

import { SignUpEmployeeService } from './sign-up-employee.service';

describe('SignUpEmployeeService', () => {
  let service: SignUpEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
