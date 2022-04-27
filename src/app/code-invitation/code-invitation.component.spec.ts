import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInvitationComponent } from './code-invitation.component';

describe('CodeInvitationComponent', () => {
  let component: CodeInvitationComponent;
  let fixture: ComponentFixture<CodeInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeInvitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
