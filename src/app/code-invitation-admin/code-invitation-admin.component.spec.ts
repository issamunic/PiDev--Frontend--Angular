import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInvitationAdminComponent } from './code-invitation-admin.component';

describe('CodeInvitationAdminComponent', () => {
  let component: CodeInvitationAdminComponent;
  let fixture: ComponentFixture<CodeInvitationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeInvitationAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeInvitationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
