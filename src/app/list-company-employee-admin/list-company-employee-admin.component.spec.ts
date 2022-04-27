import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyEmployeeAdminComponent } from './list-company-employee-admin.component';

describe('ListCompanyEmployeeAdminComponent', () => {
  let component: ListCompanyEmployeeAdminComponent;
  let fixture: ComponentFixture<ListCompanyEmployeeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanyEmployeeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyEmployeeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
