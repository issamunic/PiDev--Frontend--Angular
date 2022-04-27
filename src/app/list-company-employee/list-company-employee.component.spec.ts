import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyEmployeeComponent } from './list-company-employee.component';

describe('ListCompanyEmployeeComponent', () => {
  let component: ListCompanyEmployeeComponent;
  let fixture: ComponentFixture<ListCompanyEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanyEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
