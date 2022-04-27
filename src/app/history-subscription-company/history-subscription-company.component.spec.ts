import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySubscriptionCompanyComponent } from './history-subscription-company.component';

describe('HistorySubscriptionCompanyComponent', () => {
  let component: HistorySubscriptionCompanyComponent;
  let fixture: ComponentFixture<HistorySubscriptionCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySubscriptionCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySubscriptionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
