import { TestBed } from '@angular/core/testing';

import { CodeInvitationCompanyService } from './code-invitation-company.service';

describe('CodeInvitationCompanyService', () => {
  let service: CodeInvitationCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeInvitationCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
