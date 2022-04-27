import { TestBed } from '@angular/core/testing';

import { SubscriptionCompanyService } from './subscription-company.service';

describe('SubscriptionCompanyService', () => {
  let service: SubscriptionCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
