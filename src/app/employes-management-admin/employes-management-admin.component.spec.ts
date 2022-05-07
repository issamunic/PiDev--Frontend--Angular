import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesManagementAdminComponent } from './employes-management-admin.component';

describe('EmployesManagementAdminComponent', () => {
  let component: EmployesManagementAdminComponent;
  let fixture: ComponentFixture<EmployesManagementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployesManagementAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployesManagementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
