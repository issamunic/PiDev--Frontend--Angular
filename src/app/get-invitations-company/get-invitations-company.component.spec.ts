import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInvitationsCompanyComponent } from './get-invitations-company.component';

describe('GetInvitationsCompanyComponent', () => {
  let component: GetInvitationsCompanyComponent;
  let fixture: ComponentFixture<GetInvitationsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetInvitationsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInvitationsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
