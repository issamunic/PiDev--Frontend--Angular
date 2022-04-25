import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllInvitationsComponent } from './get-all-invitations.component';

describe('GetAllInvitationsComponent', () => {
  let component: GetAllInvitationsComponent;
  let fixture: ComponentFixture<GetAllInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllInvitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
