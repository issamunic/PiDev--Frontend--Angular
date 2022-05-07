import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementAdminComponent } from './users-management-admin.component';

describe('UsersManagementAdminComponent', () => {
  let component: UsersManagementAdminComponent;
  let fixture: ComponentFixture<UsersManagementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManagementAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
